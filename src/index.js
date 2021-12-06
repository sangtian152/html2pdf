// 导出页面为PDF格式
import html2Canvas from 'html2canvas';
import JsPDF from 'jspdf';

// 获取元素距离页面顶部的距离
const getDisTop = function (element) {
    var realTop = element.offsetTop;
    var parent = element.offsetParent;
    while (parent !== null) {
        realTop += parent.offsetTop;
        parent = parent.offsetParent;
    }
    return realTop;
}
const splitPage = function($dom, PDF_WIDTH, PDF_HEIGHT) {
    const pageOffsetTop = getDisTop($dom);
    const pageOffsetWidth = $dom.offsetWidth;
    const $unitElements = $dom.querySelectorAll('.minimum-unit');
    const peerPageHeight = pageOffsetWidth / PDF_WIDTH * PDF_HEIGHT; // 获取缩放后的一页页面高度
    const pages = [
        [
            {
                top: 0, // 起点初始化
                offsetTop: 0
            }
        ]
    ];

    // 遍历最小单元格
    // 获取单元格底部距离顶部的高度 top，以及 offsetTop
    // 根据 top 值，算出该单元格的页码，放入数组 pages
    let pageIndex = 0;
    let oldTop = 0;
    $unitElements.forEach($element => {
        const toTop = getDisTop($element);
        const offsetTop = toTop - pageOffsetTop;
        const top = offsetTop + $element.offsetHeight;
        const flag = Math.floor((top - oldTop) / peerPageHeight);
        // 新的一页
        if (flag === 1) {
            pageIndex++;
            pages[pageIndex] = [];
            oldTop = offsetTop;
        }

        pages[pageIndex].push({
            top,
            offsetTop
        });
    });

    return pages;
}
const html2pdf = function(element, options) {
    const opt = Object.assign({
        title: '品质核查报告',
        scale: 2,
        TO_LEFT: 20,
        TO_TOP: 20
    }, options);
    const { title, scale, TO_LEFT, TO_TOP } = opt;
    return new Promise((resolve, reject) => {
        const w = element.offsetWidth; // 获得该容器的宽
        const h = element.offsetHeight; // 获得该容器的高
        const offsetTop = element.offsetTop; // 获得该容器到文档顶部的距离
        const offsetLeft = element.offsetLeft; // 获得该容器到文档最左的距离
        const canvas = document.createElement('canvas');
        let abs = 0;
        // a4纸的尺寸[595.28, 841.89]，
        const A4_WIDTH = 592.28;
        const A4_HEIGHT = 841.89;
        const winI = document.body.clientWidth; // 获得当前可视窗口的宽度（不包含滚动条）
        const winO = window.innerWidth; // 获得当前窗口的宽度（包含滚动条）
        if (winO > winI) {
            abs = (winO - winI) / 2; // 获得滚动条长度的一半
        }
        canvas.width = w * scale; // 将画布宽&&高放大两倍
        canvas.height = h * scale;
        const context = canvas.getContext('2d');
        context.scale(scale, scale);
        context.translate(-offsetLeft - abs, -offsetTop);
        // 这里默认横向没有滚动条的情况，因为offset.left(),有无滚动条的时候存在差值，因此
        // translate的时候，要把这个差值去掉
        html2Canvas(element, {
            tainttest: true,
            background: '#fff',
            width: w, // dom 原始宽度
            height: h // dom 原始高度
        }).then(function (canvas) {
            const contentWidth = canvas.width;
            const contentHeight = canvas.height;
            // 一页pdf显示html页面生成的canvas高度;
            const pageHeight = contentWidth / A4_WIDTH * A4_HEIGHT;
            // 未生成pdf的html页面高度
            let leftHeight = contentHeight;
            // 一页pdf的高度的宽高
            const PDF_WIDTH = A4_WIDTH - TO_LEFT * 2;
            const PDF_HEIGHT = A4_HEIGHT - TO_TOP * 2;

            const pdf = new JsPDF('', 'pt', 'a4');
            // 有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(A4_HEIGHT)
            // 当内容未超过pdf一页显示的范围，无需分页
            if (leftHeight < pageHeight) {
                const height = Math.min(PDF_HEIGHT, PDF_WIDTH * leftHeight / contentWidth);
                pdf.addImage(canvas.toDataURL('image/jpeg', 1.0), 'JPEG', TO_LEFT, TO_TOP, PDF_WIDTH, height);
            } else { // 分页
                const pages = splitPage(element, PDF_WIDTH, PDF_HEIGHT - 10);
                pages.forEach((page, index) => {
                    const { offsetTop } = page[0];
                    const { top } = page[page.length - 1];
                    const ctx = canvas.getContext('2d');
                    if (index > 0) {
                        pdf.addPage();
                    }
                    let height = top;
                    if (index > 0) {
                        const old = pages[index - 1];
                        height = top - old[old.length - 1].top;
                    }
                    // canvas 高度和dom 高度的比值
                    const c2h = contentHeight / h;
                    const pageCtx = document.createElement('canvas');
                    pageCtx.width = contentWidth;
                    pageCtx.height = Math.min(pageHeight, height * c2h);// 可能内容不足一页
                    // 用getImageData剪裁指定区域，并画到前面建立的canvas对象中
                    pageCtx.getContext('2d').putImageData(ctx.getImageData(0, offsetTop * c2h, contentWidth, pageCtx.height), 0, 0);
                    pdf.addImage(pageCtx.toDataURL('image/jpeg', 1.0), 'JPEG', TO_LEFT, TO_TOP, PDF_WIDTH, Math.min(PDF_HEIGHT, PDF_WIDTH * pageCtx.height / contentWidth));
                });
            }
            pdf.save(title + '.pdf');
            resolve('下载成功');
        });
    });
}
export default html2pdf
