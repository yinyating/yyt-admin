const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const copyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    // 模式
    mode: 'development',
    // 入口
    entry: './src/app.js',
    // 出口
    output: {
        path: path.resolve(__dirname,'../dev'),
        filename: 'app.js'
    },
    // 做web-dev-server的配置  需要本地安装 webpack-dev-server
    devServer: {
        contentBase: path.resolve(__dirname, '../dev'),
        port: 8000
    },
    // loaders
    module:{
        rules:[
            {
                test: /\.art$/,
                loader: 'art-template-loader'
            }
        ]
    },
    // 插件
    plugins:[
        // 打包html + css + js
        // 打包编译html  html-webpack-plugin
        new htmlWebpackPlugin({
            // 配置参数，找到index.html
            // template: 'index.html',  //需要（被）打包的文件
            template: './index.html',  //需要（被）打包的文件
            filename: 'index.html'  // 打包到目标文件夹的目标文件名
        }),

        // 拷贝 public source
        // 拷贝样式文件  copy-webpack-plugin 
        new copyWebpackPlugin([{
            from:'./public',
            to: './public'
        }])
    ]
    

}