const path = require('path');

module.exports = {
  // 入口文件
  entry: './src/index.js',
  // 输出
  output: {
    // 输出文件名
    filename: 'bundle.js',
    /* 
      输出的路径
      __dirname 是nodejs的变量，指当前文件目录的绝对路径
    */
    path: path.resolve(__dirname, 'dist')
  },
  // loader配置: 帮助webpack解析翻译它不能识别的模块
  module: {
    rules: [
      {
        // 匹配哪些文件
        test: /\.css$/,
        // 使用哪些loader处理
        use: [   // ** 执行顺序从下到上!!! **
          { loader: 'style-loader' },
          { loader: 'css-loader' },
        ]
      },
      {
        test: /\.scss$/,
        use: [   // ** 执行顺序从下到上!!! **
          {
            loader: "style-loader" // 创建style标签, 将 css-loader 转化在js中的样式资源插入, 添加到head中生效
          }, 
          {
            loader: "css-loader" // 将 CSS 转化成 CommonJS 模块, 加载到js中, 里面内容是样式字符串
          }, 
          {
            loader: "sass-loader" // 将 Sass 编译成 CSS (注意这里需要下 sass-loader 和 sass 两个包)
          }
        ]
      }
    ],
  },
  // 插件配置
  plugins: [

  ],
  // 配置环境
  mode: 'development'

}