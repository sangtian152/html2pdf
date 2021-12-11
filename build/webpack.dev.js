const webpackConfig = require('./webpack.conf')
const config = require('./config')
const portfinder = require('portfinder')
const { merge } = require('webpack-merge')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const dotenv = require('dotenv').config()

if (dotenv.error) {
  throw dotenv.error
}

const HOST = process.env.HOST

const devWebpackConfig = merge(webpackConfig, {
  mode: 'development',
  devServer: {
    hot: true,
    host: HOST || config.dev.host,
  },
  plugins:[
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'demo/index.html',
      inject: true,
      // favicon: resolve('jzf-favicon.ico'),
      title: '金账房'
    })
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port)=>{
    if(err){
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port
      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(
        new FriendlyErrorsPlugin({
          compilationSuccessInfo: {
            messages: [
              `Your application is running here: http://${
                devWebpackConfig.devServer.host
              }:${port}`
            ]
          },
          onErrors: config.dev.notifyOnErrors
            ? utils.createNotifierCallback()
            : undefined
        })
      )

      resolve(devWebpackConfig)
    }
  })
})