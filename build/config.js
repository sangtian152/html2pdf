const path = require('path');
const fs = require('fs');
// 告诉 Webpack 不要捆绑这些模块或其任何子模块。
const nodeExternals = require('webpack-node-externals');
let externals = {};

externals = [Object.assign({
  vue: 'vue'
}, externals), nodeExternals()];

exports.externals = externals;

exports.alias = {
  src: path.resolve(__dirname, '../src'),
  packages: path.resolve(__dirname, '../packages'),
  'iwei-ui': path.resolve(__dirname, '../')
};

exports.vue = {
  root: 'Vue',
  commonjs: 'vue',
  commonjs2: 'vue',
  amd: 'vue'
};

exports.jsexclude = /node_modules|utils\/popper\.js|utils\/date\.js/;
