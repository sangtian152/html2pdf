/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ src; }
});

;// CONCATENATED MODULE: external "core-js/modules/es.object.to-string.js"
var es_object_to_string_js_namespaceObject = require("core-js/modules/es.object.to-string.js");
;// CONCATENATED MODULE: external "core-js/modules/web.dom-collections.for-each.js"
var web_dom_collections_for_each_js_namespaceObject = require("core-js/modules/web.dom-collections.for-each.js");
;// CONCATENATED MODULE: external "core-js/modules/es.object.assign.js"
var es_object_assign_js_namespaceObject = require("core-js/modules/es.object.assign.js");
;// CONCATENATED MODULE: external "core-js/modules/es.promise.js"
var es_promise_js_namespaceObject = require("core-js/modules/es.promise.js");
;// CONCATENATED MODULE: external "html2canvas"
var external_html2canvas_namespaceObject = require("html2canvas");
var external_html2canvas_default = /*#__PURE__*/__webpack_require__.n(external_html2canvas_namespaceObject);
;// CONCATENATED MODULE: external "jspdf"
var external_jspdf_namespaceObject = require("jspdf");
var external_jspdf_default = /*#__PURE__*/__webpack_require__.n(external_jspdf_namespaceObject);
;// CONCATENATED MODULE: ./src/index.js




// 导出页面为PDF格式

 // 获取元素距离页面顶部的距离

var getDisTop = function getDisTop(element) {
  var realTop = element.offsetTop;
  var parent = element.offsetParent;

  while (parent !== null) {
    realTop += parent.offsetTop;
    parent = parent.offsetParent;
  }

  return realTop;
};

var splitPage = function splitPage($dom, PDF_WIDTH, PDF_HEIGHT) {
  var pageOffsetTop = getDisTop($dom);
  var pageOffsetWidth = $dom.offsetWidth;
  var $unitElements = $dom.querySelectorAll('.minimum-unit');
  var peerPageHeight = pageOffsetWidth / PDF_WIDTH * PDF_HEIGHT; // 获取缩放后的一页页面高度

  var pages = [[{
    top: 0,
    // 起点初始化
    offsetTop: 0
  }]]; // 遍历最小单元格
  // 获取单元格底部距离顶部的高度 top，以及 offsetTop
  // 根据 top 值，算出该单元格的页码，放入数组 pages

  var pageIndex = 0;
  var oldTop = 0;
  $unitElements.forEach(function ($element) {
    var toTop = getDisTop($element);
    var offsetTop = toTop - pageOffsetTop;
    var top = offsetTop + $element.offsetHeight;
    var flag = Math.floor((top - oldTop) / peerPageHeight); // 新的一页

    if (flag === 1) {
      pageIndex++;
      pages[pageIndex] = [];
      oldTop = offsetTop;
    }

    pages[pageIndex].push({
      top: top,
      offsetTop: offsetTop
    });
  });
  return pages;
};

var html2pdf = function html2pdf(element, options) {
  var opt = Object.assign({
    title: '品质核查报告',
    scale: 2,
    TO_LEFT: 20,
    TO_TOP: 20
  }, options);
  var title = opt.title,
      scale = opt.scale,
      TO_LEFT = opt.TO_LEFT,
      TO_TOP = opt.TO_TOP;
  return new Promise(function (resolve, reject) {
    var w = element.offsetWidth; // 获得该容器的宽

    var h = element.offsetHeight; // 获得该容器的高

    var offsetTop = element.offsetTop; // 获得该容器到文档顶部的距离

    var offsetLeft = element.offsetLeft; // 获得该容器到文档最左的距离

    var canvas = document.createElement('canvas');
    var abs = 0; // a4纸的尺寸[595.28, 841.89]，

    var A4_WIDTH = 592.28;
    var A4_HEIGHT = 841.89;
    var winI = document.body.clientWidth; // 获得当前可视窗口的宽度（不包含滚动条）

    var winO = window.innerWidth; // 获得当前窗口的宽度（包含滚动条）

    if (winO > winI) {
      abs = (winO - winI) / 2; // 获得滚动条长度的一半
    }

    canvas.width = w * scale; // 将画布宽&&高放大两倍

    canvas.height = h * scale;
    var context = canvas.getContext('2d');
    context.scale(scale, scale);
    context.translate(-offsetLeft - abs, -offsetTop); // 这里默认横向没有滚动条的情况，因为offset.left(),有无滚动条的时候存在差值，因此
    // translate的时候，要把这个差值去掉

    external_html2canvas_default()(element, {
      tainttest: true,
      background: '#fff',
      width: w,
      // dom 原始宽度
      height: h // dom 原始高度

    }).then(function (canvas) {
      var contentWidth = canvas.width;
      var contentHeight = canvas.height; // 一页pdf显示html页面生成的canvas高度;

      var pageHeight = contentWidth / A4_WIDTH * A4_HEIGHT; // 未生成pdf的html页面高度

      var leftHeight = contentHeight; // 一页pdf的高度的宽高

      var PDF_WIDTH = A4_WIDTH - TO_LEFT * 2;
      var PDF_HEIGHT = A4_HEIGHT - TO_TOP * 2;
      var pdf = new (external_jspdf_default())('', 'pt', 'a4'); // 有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(A4_HEIGHT)
      // 当内容未超过pdf一页显示的范围，无需分页

      if (leftHeight < pageHeight) {
        var height = Math.min(PDF_HEIGHT, PDF_WIDTH * leftHeight / contentWidth);
        pdf.addImage(canvas.toDataURL('image/jpeg', 1.0), 'JPEG', TO_LEFT, TO_TOP, PDF_WIDTH, height);
      } else {
        // 分页
        var pages = splitPage(element, PDF_WIDTH, PDF_HEIGHT - 10);
        pages.forEach(function (page, index) {
          var offsetTop = page[0].offsetTop;
          var top = page[page.length - 1].top;
          var ctx = canvas.getContext('2d');

          if (index > 0) {
            pdf.addPage();
          }

          var height = top;

          if (index > 0) {
            var old = pages[index - 1];
            height = top - old[old.length - 1].top;
          } // canvas 高度和dom 高度的比值


          var c2h = contentHeight / h;
          var pageCtx = document.createElement('canvas');
          pageCtx.width = contentWidth;
          pageCtx.height = Math.min(pageHeight, height * c2h); // 可能内容不足一页
          // 用getImageData剪裁指定区域，并画到前面建立的canvas对象中

          pageCtx.getContext('2d').putImageData(ctx.getImageData(0, offsetTop * c2h, contentWidth, pageCtx.height), 0, 0);
          pdf.addImage(pageCtx.toDataURL('image/jpeg', 1.0), 'JPEG', TO_LEFT, TO_TOP, PDF_WIDTH, Math.min(PDF_HEIGHT, PDF_WIDTH * pageCtx.height / contentWidth));
        });
      }

      pdf.save(title + '.pdf');
      resolve('下载成功');
    });
  });
};

/* harmony default export */ var src = (html2pdf);
module.exports.html2pdf = __webpack_exports__["default"];
/******/ })()
;