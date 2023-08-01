const getBaseCfg = require('./webpack.base');
const {merge} = require('webpack-merge');
const path = require('path');

module.exports = merge(getBaseCfg(true), {
    devtool: "source-map",
    devServer: {
        port: 3000,
        compress: false, // 不要压缩
        hot: true,      // 热更新
        historyApiFallback: true, // 解决404的问题
        static: {
            directory: path.join(__dirname, '../public')
        }
    }
})