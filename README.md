## html2pdf

## 介绍
将html生成pdf，依赖html2canvas和jspdf

### 安装
```
npm install @sangtian152/html2pdf --save
# or 
yarn add @sangtian152/html2pdf
```

### 引入
```
import html2pdf from '@sangtian152/html2pdf';

html2pdf(element, options);
```

### 参数

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| element   | 要生成pdf的dom元素   | Element        |  —   |   —   |
| options   | 配置参数，详见options   | Object  |  —   |  —   |


### options

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| title   | 生成的pdf文件名   | String        |  —   |   pdf   |
| scale   | html2canvas的放大倍数，值越大生成的pdf越清晰，但相应的会影响性能   | Number  |  —   |  —   |
| padding   | pdf页边距   | Array  |  —   |  —   |
| format   | pdf纸型   | String  |  —   |  A4   |
| orientation   | 方向（纵向、横向）   | String  |  P,L   |  P   |
| unit   | 单位   | String  |  —   |  pt   |
| stretch   | 当打印内容宽度小于pdf宽度时，是否拉伸   | Boolean  |  —   |  true  |
| background   | pdf背景色   | String  |  —   |  #ffffff   |
| useCORS   | 是否跨域，为true时才能加载跨域图片（需后端开启跨域）   | Boolean  |  —   |  false   |
| minimumUnit   | 最小分割单元，分页时最小分割单元不会被分成半截（如果单个最小分割单元高度已经超出PDF页面高度也会被分割）   | String  |  css选择器   |  —   |
| ignoreElements   | 设置排除元素，参数为当前dom元素，要求返回 Boolean   | Function  |  —   |  —   |


### 最新版本

[![NPM version](https://img.shields.io/npm/v/@sangtian152/html2pdf)](https://www.npmjs.com/package/@sangtian152/html2pdf)
