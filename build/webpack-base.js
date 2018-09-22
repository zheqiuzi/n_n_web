const webpack = require('webpack');
const HtmlWebpackPlugin =require('html-webpack-plugin');//对html 内容变量处理 link script 资源处理
const HtmlWebpackInlineSourcePlugin=require('html-webpack-inline-source-plugin');//合并js和css到html中去
const devServer=require("webpack-dev-server");
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const path = require("path");

const publicPath = '/';
const buildPath = 'dist';

module.exports={
    devtool: 'eval-source-map',//生成Source Maps,这里选择eval-source-map
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.common.js'
        }
    },

    entry:{
        user:"./src/static/js/niuniu/user.js"
    },

    output:{
        //__dirname,就是当前webpack.config.js文件所在的绝对路径
        path:__dirname+"/dist/",//输出路径，要用绝对路径
        filename:'[name].bundle.js',//打包后输出的文件名
        publicPath: '/'
    },
    module: {
        rules:[
            {
                test:/\.vue$/,
                use: 'vue-loader',
                exclude: /node_modules/
            },
            {
                test:/\.less$/,
                loader:['style-loader','css-loader','less-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },

            {
                test:/\.(png|jpg|jpeg|gif|svg)(\?.*)?$/,
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            limit:10000,
                            name:'img/[name].[ext]?[hash]'
                        }
                    }
                    ],
                exclude: /node_modules/
            },
            {
                test:/\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use:[
                    {
                        loader:"url-loader",
                        options:{
                            limit:10000,
                            name:'fonts/[name].[ext]?[hash]'
                        }
                    }
                ],
                exclude: /node_modules/
            },


            {
                test:/\.css/,
                use:[
                    "style-loader",
                    "css-loader"
                ],
                exclude: /node_modules/
            }

        ]
    },

//可以在此写入网站seo优化关键字之类的公共文字
    plugins:[

        new HtmlWebpackPlugin({
            template:'./src/html/niuniu/user.html',
            filename:'html/niuniu/user.html',
            inject:'body',
            chunks:['user'],//选择entry实体中需要用到的js
        }),

        new VueLoaderPlugin(),
        new HtmlWebpackInlineSourcePlugin(),//,合并js和css到html中去 在谁后面就处理谁
        new webpack.HotModuleReplacementPlugin()

    ],
    //非node模式热加载
    devServer:{
        contentBase: "src",
        publicPath:  '/',//保持与output中的publicPath一致
        // historyApiFallback:true,
        host: '0.0.0.0',
        useLocalIp: true,
        inline:true,
        port:9090,
        // hot:true
    }

}