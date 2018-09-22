var config = require("./webpack-base.js");
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

// config.entry.app.unshift("webpack-dev-server/client?http://localhost:8080/");

var compiler = webpack(config);
var server = new WebpackDevServer(compiler, {
    contentBase:'../src/',
    inline:true,
    useLocalIp: true,
    historyApiFallback:true,
    hot:true
    // publicPath: "/assets/"
});
server.listen(8080);

