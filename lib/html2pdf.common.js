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




// ???????????????PDF??????

 // ??????????????????

var getPageSize = function getPageSize(orientation, unit, format) {
  unit = unit || "mm";
  format = format || "a4";
  orientation = ("" + (orientation || "P")).toLowerCase();
  var format_as_string = ("" + format).toLowerCase(); // Size in pt of various paper formats

  var pageFormats = {
    a0: [2383.94, 3370.39],
    a1: [1683.78, 2383.94],
    a2: [1190.55, 1683.78],
    a3: [841.89, 1190.55],
    a4: [595.28, 841.89],
    a5: [419.53, 595.28],
    a6: [297.64, 419.53],
    a7: [209.76, 297.64],
    a8: [147.4, 209.76],
    a9: [104.88, 147.4],
    a10: [73.7, 104.88],
    b0: [2834.65, 4008.19],
    b1: [2004.09, 2834.65],
    b2: [1417.32, 2004.09],
    b3: [1000.63, 1417.32],
    b4: [708.66, 1000.63],
    b5: [498.9, 708.66],
    b6: [354.33, 498.9],
    b7: [249.45, 354.33],
    b8: [175.75, 249.45],
    b9: [124.72, 175.75],
    b10: [87.87, 124.72],
    c0: [2599.37, 3676.54],
    c1: [1836.85, 2599.37],
    c2: [1298.27, 1836.85],
    c3: [918.43, 1298.27],
    c4: [649.13, 918.43],
    c5: [459.21, 649.13],
    c6: [323.15, 459.21],
    c7: [229.61, 323.15],
    c8: [161.57, 229.61],
    c9: [113.39, 161.57],
    c10: [79.37, 113.39],
    dl: [311.81, 623.62],
    letter: [612, 792],
    "government-letter": [576, 756],
    legal: [612, 1008],
    "junior-legal": [576, 360],
    ledger: [1224, 792],
    tabloid: [792, 1224],
    "credit-card": [153, 243]
  };
  var k; // Unit conversion

  switch (unit) {
    case "pt":
      k = 1;
      break;

    case "mm":
      k = 72 / 25.4;
      break;

    case "cm":
      k = 72 / 2.54;
      break;

    case "in":
      k = 72;
      break;

    case "px":
      k = 72 / 96;
      break;

    case "pc":
      k = 12;
      break;

    case "em":
      k = 12;
      break;

    case "ex":
      k = 6;
      break;

    default:
      throw "Invalid unit: " + unit;
  }

  var pageHeight = 0;
  var pageWidth = 0; // Dimensions are stored as user units and converted to points on output

  if (pageFormats.hasOwnProperty(format_as_string)) {
    pageHeight = pageFormats[format_as_string][1] / k;
    pageWidth = pageFormats[format_as_string][0] / k;
  } else {
    try {
      pageHeight = format[1];
      pageWidth = format[0];
    } catch (err) {
      throw new Error("Invalid format: " + format);
    }
  }

  var tmp; // Handle page orientation

  if (orientation === "p" || orientation === "portrait") {
    orientation = "p";

    if (pageWidth > pageHeight) {
      tmp = pageWidth;
      pageWidth = pageHeight;
      pageHeight = tmp;
    }
  } else if (orientation === "l" || orientation === "landscape") {
    orientation = "l";

    if (pageHeight > pageWidth) {
      tmp = pageWidth;
      pageWidth = pageHeight;
      pageHeight = tmp;
    }
  } else {
    throw "Invalid orientation: " + orientation;
  } // Return information (k is the unit conversion ratio from pts)


  var info = {
    width: pageWidth,
    height: pageHeight,
    unit: unit,
    k: k,
    orientation: orientation
  };
  return info;
}; // ???????????????????????????????????????


var getDisTop = function getDisTop(element) {
  var realTop = element.offsetTop;
  var parent = element.offsetParent;

  while (parent !== null) {
    realTop += parent.offsetTop;
    parent = parent.offsetParent;
  }

  return realTop;
};

var splitPage = function splitPage($dom, PDF_WIDTH, PDF_HEIGHT, minimumUnit) {
  var pageOffsetWidth = $dom.offsetWidth;
  var peerPageHeight = pageOffsetWidth / PDF_WIDTH * PDF_HEIGHT; // ????????????????????????????????????

  var pages = [];

  if (!minimumUnit) {
    var pageOffsetHeight = $dom.offsetHeight;

    for (var offsetTop = 0; offsetTop < pageOffsetHeight; offsetTop += peerPageHeight) {
      pages.push([{
        top: Math.min(pageOffsetHeight, offsetTop + peerPageHeight),
        offsetTop: offsetTop
      }]);
    }

    return pages;
  }

  pages.push([{
    top: 0,
    offsetTop: 0
  }]);
  var pageOffsetTop = getDisTop($dom);
  var $unitElements = $dom.querySelectorAll(minimumUnit); // ?????????????????????
  // ?????????????????????????????????????????? top????????? offsetTop
  // ?????? top ???????????????????????????????????????????????? pages

  var pageIndex = 0;
  var oldTop = 0;
  $unitElements.forEach(function ($element) {
    var toTop = getDisTop($element);
    var offsetTop = toTop - pageOffsetTop;
    var top = offsetTop + $element.offsetHeight;
    var flag = Math.floor((top - oldTop) / peerPageHeight); // ????????????

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

var getPadding = function getPadding(arr) {
  var pad = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };

  if (Array.isArray(arr) && arr.length > 0) {
    pad.top = arr[0];
    pad.right = arr[1] || pad.top;
    pad.bottom = arr[2] || pad.top;
    pad.left = arr[3] || pad.right;
  }

  return pad;
};

var setFillColor = function setFillColor(pdf, width, height, color) {
  if (color) {
    pdf.setFillColor(color);
    pdf.rect(0, 0, width, height, 'F');
  }
};

var html2pdf = function html2pdf(element, options) {
  var opt = Object.assign({
    title: '',
    // ??????
    scale: 2,
    // ????????????
    padding: [20],
    // ??????
    format: 'a4',
    // ??????
    orientation: 'p',
    // ?????? p???????????? ??? l????????????
    unit: 'pt',
    // ??????
    stretch: true,
    // ???????????????????????????pdf????????????????????????
    background: '#fff',
    // ?????????
    useCORS: false,
    minimumUnit: '',
    // ??????????????????
    ignoreElements: function ignoreElements(ele) {
      return false;
    } // ????????????

  }, options);
  var title = opt.title,
      scale = opt.scale,
      orientation = opt.orientation,
      unit = opt.unit,
      format = opt.format,
      padding = opt.padding,
      stretch = opt.stretch,
      background = opt.background;
  var pad = getPadding(padding);
  return new Promise(function (resolve, reject) {
    var DOM_WIDTH = element.offsetWidth; // ?????????????????????

    var DOM_HEIGHT = element.offsetHeight; // ?????????????????????

    var page = getPageSize(orientation, unit, format);
    var PAGE_WIDTH = page.width;
    var PAGE_HEIGHT = page.height;
    external_html2canvas_default()(element, {
      scale: scale,
      width: DOM_WIDTH,
      // dom ????????????
      height: DOM_HEIGHT,
      // dom ????????????
      useCORS: opt.useCORS,
      tainttest: true,
      ignoreElements: opt.ignoreElements,
      backgroundColor: background
    }).then(function (canvas) {
      // ?????????canvas??????
      var CTX_WIDTH = canvas.width;
      var CTX_HEIGHT = canvas.height; // pdf?????????(????????????)??????

      var PDF_MAIN_WIDTH = PAGE_WIDTH - (pad.left + pad.right); // ??????pdf?????????

      var PDF_WIDTH = stretch ? PDF_MAIN_WIDTH : Math.min(PDF_MAIN_WIDTH, CTX_WIDTH);
      var PDF_HEIGHT = PAGE_HEIGHT - (pad.top + pad.bottom); // ??????pdf??????html???????????????canvas??????;

      var CTX_PAGE_HEIGHT = CTX_WIDTH / PDF_WIDTH * PDF_HEIGHT;
      var pdf = new (external_jspdf_default())(orientation, unit, format);
      setFillColor(pdf, PAGE_WIDTH, PAGE_HEIGHT, background); // ???????????????????????????????????????html?????????????????????????????????pdf???????????????(PAGE_HEIGHT)
      // ??????????????????pdf????????????????????????????????????

      if (CTX_HEIGHT < CTX_PAGE_HEIGHT) {
        var height = Math.min(PDF_HEIGHT, PDF_WIDTH * CTX_HEIGHT / CTX_WIDTH);
        pdf.addImage(canvas.toDataURL('image/jpeg', 1.0), 'JPEG', pad.left, pad.top, PDF_WIDTH, height);
      } else {
        // ??????
        var pages = splitPage(element, PDF_WIDTH, PDF_HEIGHT - 10, opt.minimumUnit);
        pages.forEach(function (page, index) {
          if (index > 0) {
            pdf.addPage();
            setFillColor(pdf, PAGE_WIDTH, PAGE_HEIGHT, background);
          }

          var offsetTop = page[0].offsetTop;
          var top = page[page.length - 1].top; // ????????????????????????????????????????????????????????????????????????????????????

          var height = top;

          if (index > 0) {
            // ?????????????????????????????????????????????????????????????????????
            var old = pages[index - 1];
            height = top - old[old.length - 1].top;
          } // canvas ?????????dom ???????????????


          var c2h = CTX_HEIGHT / DOM_HEIGHT;
          var ctx = canvas.getContext('2d');
          var pageCtx = document.createElement('canvas');
          pageCtx.width = CTX_WIDTH;
          pageCtx.height = Math.min(CTX_PAGE_HEIGHT, height * c2h); // ????????????????????????
          // ???getImageData?????????????????????????????????????????????canvas?????????

          pageCtx.getContext('2d').putImageData(ctx.getImageData(0, offsetTop * c2h, CTX_WIDTH, pageCtx.height), 0, 0);
          pdf.addImage(pageCtx.toDataURL('image/jpeg', 1.0), 'JPEG', pad.left, pad.top, PDF_WIDTH, Math.min(PDF_HEIGHT, PDF_WIDTH * pageCtx.height / CTX_WIDTH));
        });
      }

      pdf.save(title + '.pdf');
      resolve('????????????');
    });
  });
};

/* harmony default export */ var src = (html2pdf);
module.exports.html2pdf = __webpack_exports__["default"];
/******/ })()
;