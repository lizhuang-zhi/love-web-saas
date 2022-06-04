const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
// 提取CSS为单独文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

module.exports = {
  // 入口文件
  entry: {
    index: [
      path.resolve(__dirname, "js/index.js"),
      path.resolve(__dirname, "js/carousel.js"),
    ],
    album: path.resolve(__dirname, "js/album.js"),
  },
  // 输出
  output: {
    // 输出文件名
    filename: "js/[name].[chunkhash:8].js",
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [{
        // 匹配哪些文件
        test: /\.css$/,
        // 使用哪些loader处理
        use: [ // ** 执行顺序从下到上!!! **
          // 这个loader取代style-loader。作用：提取js中的css成单独文件
          MiniCssExtractPlugin.loader,
          // 将css文件整合到js文件中
          'css-loader'
        ]
      },
      // webpack5可以不使用loader来打包图片
      {
        test: /\.(png|jpe?g|svg|gif)$/i,
        type: 'asset',
        generator: {
          filename: 'imgs/[hash:20][ext]'
        }
      },
      // 处理在html中引入图片
      {
        test: /\.(htm|html)$/,
        exclude: /node_modules/,
        use: 'html-withimg-loader',
      },
    ],
  },
  // 插件配置
  plugins: [
    new CleanWebpackPlugin(),
    // index页面
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname, "index.html"),
      // 配置对应模块的js
      chunks: ["index"],
      inject: true,
      minify: {
        html5: true,
        minifyCSS: true,
        minifyJS: true,
        // 移除空格
        collapseWhitespace: true,
        // 移除注释
        removeComments: true,
        preserveLineBreaks: false
      }
    }),
    // album页面
    new HtmlWebpackPlugin({
      filename: "album.html",
      template: path.resolve(__dirname, "album.html"),
      chunks: ["album"],
      inject: true,
      minify: {
        html5: true,
        minifyCSS: true,
        minifyJS: true,
        // 移除空格
        collapseWhitespace: true,
        // 移除注释
        removeComments: true,
        preserveLineBreaks: false
      }
    }),
    // 使用MiniCssExtractPlugin插件
    new MiniCssExtractPlugin({
      filename: './css/[name].[contenthash].css',
      chunkFilename: './css/[name].[contenthash].css',
    }),
    // 引入第三方库
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
  ],
  // 配置环境, 压缩js
  mode: 'production'
}