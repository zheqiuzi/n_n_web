const webpack = require('webpack');
const HtmlWebpackPlugin =require('html-webpack-plugin');//对html 内容变量处理 link script 资源处理
const HtmlWebpackInlineSourcePlugin=require('html-webpack-inline-source-plugin');//合并js和css到html中去
const devServer=require("webpack-dev-server");
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const path = require("path");

const publicPath = '/';
const buildPath = 'dist';

module.exports={
    devtool: 'eval-source-map',//生成Source Maps,这里选择eval-source-map 正式环境不用这个值
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.common.js'
        }
    },

    entry:{
        // context:path.resolve('src/static/js/'),
        index:'src/static/js/index/index.js',//入口文件
        userMgr:'src/static/js/userMgr/userMgr.js',
        info:'src/static/js/info/info.js',
        login:'src/static/js/login/login.js',
        checklist:'src/static/js/financeMgr/checklist.js',
        continualTally:'src/static/js/financeMgr/continualTally.js',
        orderDetails:"src/static/js/financeMgr/orderDetails.js",
        profile:"src/static/js/profile/profile.js"
    },

    output:{
        //__dirname,就是当前webpack.config.js文件所在的绝对路径
        path:__dirname+"/dist/",//输出路径，要用绝对路径
        filename:'[name].bundle.js',//打包后输出的文件名
        // publicPath: '/'
    },
    module: {
        rules:[
            {
                test:/\.vue$/,
                use: 'vue-loader'
            },
            {
                test:/\.less$/,
                loader:['style-loader','css-loader','less-loader']
            },
            {
                test: /\.js$/,
                use: 'babel-loader'
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
                ]
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
                ]
            },


            {
                test:/\.css/,
                use:[
                    "style-loader",
                    "css-loader"
                ]
            }

        ]
    },

//可以在此写入网站seo优化关键字之类的公共文字
    plugins:[

        new HtmlWebpackPlugin({
            template:'src/html/index/index.html',
            filename:'html/index/index.html',
            inject:'body',
            chunks:['index'],//选择entry实体中需要用到的js
        }),
        new HtmlWebpackPlugin({
            template:'src/login.html',
            filename:'login.html',
            inject:'body',
            chunks:["login"],//选择entry实体中需要用到的js
        }),
        new HtmlWebpackPlugin({
            template:'src/html/profile/profile.html',
            filename:'html/profile/profile.html',
            inject:'body',
            chunks:[],
        }),
        new HtmlWebpackPlugin({
            template:'src/html/userMgr/userMgr.html',
            filename:'html/userMgr/userMgr.html',
            inject:'body',
            chunks:['userMgr'],
        }),
        new HtmlWebpackPlugin({
            template:'src/html/info/info.html',
            filename:'html/info/info.html',
            inject:'body',
            chunks:['info'],
        }),
        new HtmlWebpackPlugin({
            template:'src/html/financeMgr/continualTally.html',
            filename:'html/financeMgr/continualTally.html',
            inject:'body',
            chunks:['continualTally'],
        }),
        new HtmlWebpackPlugin({
            template:'src/html/financeMgr/checklist.html',
            filename:'html/financeMgr/checklist.html',
            inject:'body',
            chunks:['checklist'],
        }),
        new HtmlWebpackPlugin({
            template:'src/html/financeMgr/orderDetails.html',
            filename:'html/financeMgr/orderDetails.html',
            inject:'body',
            chunks:['orderDetails'],
        }),
        new HtmlWebpackPlugin({
            template:'src/html/profile/profile.html',
            filename:'html/profile/profile.html',
            inject:'body',

            chunks:['profile'],
        }),
        // new VueLoaderPlugin(),

        // new HtmlWebpackInlineSourcePlugin(),//,合并js和css到html中去 在谁后面就处理谁
        // new webpack.HotModuleReplacementPlugin()

    ],
    // //非node模式热加载
    // devServer:{
    //     contentBase: "src",
    //     publicPath:  '/',//保持与output中的publicPath一致
    //     // historyApiFallback:true,
    //     inline:true,
    //     // hot:true
    // }

}