const path = require('path');
// const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const config = require('./config');

module.exports = {
  mode: 'production',
  entry: {
    app: './demo/index.js'
  },
  /* output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    // 配置打包输出环境，不使用箭头函数
    environment: {
      arrowFunction: false
    }
  }, */
  output: {
    clean: true, // 在生成文件之前清空 output 目录
    path: path.resolve(process.cwd(), './lib'),
    publicPath: '/dist/',
    filename: 'html2pdf.umd.js',
    chunkFilename: '[name].js',
    libraryTarget: 'umd',
    libraryExport: 'default',
    library: 'html2pdf',
    umdNamedDefine: true,
    globalObject: 'typeof self !== \'undefined\' ? self : this'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: config.alias
  },
  externals: {
    vue: config.vue,
    html2canvas: config.html2canvas,
    jspdf: config.jspdf
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false
          }
        }
      })
    ]
  },
  performance: {
    hints: false
  },
  stats: {
    children: false
  },
  module: {
    rules: [
      {
        test: /\.(jsx?|babel|es6)$/,
        include: process.cwd(),
        exclude: config.jsexclude,
        loader: 'babel-loader',
      }
    ]
  }
};
