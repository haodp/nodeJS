var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    devtool: 'eval-source-map', //配置生成Source Maps，选择合适的选项
    entry: __dirname + "/app/main.js", //已多次提及的唯一入口文件
    output: {
        path: __dirname + "/public", //打包后的文件存放的地方
        filename: "[name]-[hash].js" //打包后输出文件的文件名
    },
    module: { //在配置文件里添加JSON loader
        loaders: [{
                test: /\.json$/,
                loader: "json-loader"
            }, {
                test: /\.css$/,
                use: [
                    'style-loader', {
                        loader: 'css-loader',
                        options: {}
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function() {
                                return [
                                    require('autoprefixer')
                                ];
                            }
                        }
                    }
                ]
            }, {
                test: /\.scss$/,
                use: [
                    'style-loader', {
                        loader: 'css-loader'
                    },{
                        loader: 'sass-loader'
                    }
                ]
                //loader: ExtractTextPlugin.extract("style-loader", 'css!sass')
            },{
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader' //在webpack的module部分的loaders里进行配置即可
            }
            /*, {
                            test: /\.css$/,
                            loader: ExtractTextPlugin.extract('style', 'css?modules!postcss')
                        }*/
        ]
    },
    // postcss: [
    //     require('autoprefixer') //调用autoprefixer插件
    // ],
    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + "/app/index.tmpl.html",
            staticPath: 'static'
            // minify: true
        }),
        // new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin("[name].[hash].css"),
        new webpack.BannerPlugin("Copyright (c) 2017 Jianshu Technology Co,.LTD")
    ],
    devServer: {
        contentBase: "./public", //本地服务器所加载的页面所在的目录
        // colors: true, //终端中输出结果为彩色
        historyApiFallback: true, //不跳转
        inline: true, //实时刷新
        hot: true,
        port: 8080,
        host: 'localhost'
    }
}
