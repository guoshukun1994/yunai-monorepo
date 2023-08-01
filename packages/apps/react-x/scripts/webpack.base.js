const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const webpack = require('webpack');

module.exports = (isDev) => ({
    entry: path.join(__dirname, '../src/index.tsx'),
    mode: isDev ? "development" : "production",
    output: {
        filename: 'static/js/[name].[chunkhash:8].js',
        path: path.join(__dirname, "../dist"),
        clean: true, // w4 - clean-webpack-plugin
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /.(ts|tsx)$/,
                use: {
                    loader: 'babel-loader',
                }
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js'] // 解析文件的时候不用写目录 index的文件
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, "../public/index.html"),
            inject: true,   // 把打包的文件注入到指定html中
        })
    ]

})