
var webpack = require('webpack');
var WebPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin=require('copy-webpack-plugin');
module.exports={
    devtool: "source-map",
    //一个可执行模块或库的入口文件。
    entry:{
        user:"./src/static/js/niuniu/user.js",
        join:"./src/static/js/niuniu/join.js"
    },
    //输出路径
    output: {
        path: __dirname + '/dist/',
        filename: "[name].bundle.js"
    },
    //解析 在引入别名的地方加载对应的模块
    resolve: {
        alias: {
            'vue': 'vue/dist/vue.js',
            "jquery":"jquery/dist/jquery.js"
        }
    },
    module:{
        // rules:[
        //     { test: /\.css$/, use: 'css-loader' },
        //     { test: /\.ts$/, use: 'ts-loader' }
        // ],

        rules:[
            {test:/\.vue$/, use:'vue-loader'},
            {test:/\.js$/, use:'babel-loader', exclude:/node_modules/}
        ]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {
                babel:{
                    presets:['es2015'],
                    plugins:['transform-runtime']
                }
            }
        }),
        new WebPlugin({
            //输出的路径
            filename:"html/niuniu/user.html",
            //输出时需要引入的实体
            requires:['user'],
            //使用到的html模块
            template:"src/html/niuniu/user.html"

        }),
        new WebPlugin({
            //输出的路径
            filename:"html/niuniu/join.html",
            //输出时需要引入的实体
            requires:['join'],
            //使用到的html模块
            template:"src/html/niuniu/join.html"

        }),
        new CopyWebpackPlugin([
            {
                from:__dirname+"/src/static",
                to:"./static"
            }
        ])
    ]
};
