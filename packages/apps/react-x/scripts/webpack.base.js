const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
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
            },
            {
                test: /.(css|less)$/,
                use: [
                    // 我们一般情况下, 在开发环境下，我们用 style-loader,方便我们做热更新
                    // 生产环境下，我们要放在文件里
                    !isDev ? "style-loader"
                        : MiniCssExtractPlugin.loader, // MiniCssExtactPlugin 从包含css的js文件中分离打包css文件
                    // "style-loader",     // 把css-loader生成的css代码通过style标签挂在到页面的header里
                    "css-loader",      // 将各个css文件合成一个css文件
                    "postcss-loader", // css界的babel， 比如可以添加css的兼容前缀
                    "less-loader",    // less转换成css
                ] // loader加载的顺序是自下而上
            },
            {
                test: /.(png|jpg|jpeg|gif|svg)/,
                type: 'asset',
                parser: {
                    dataUrlCondition:{
                        maxSize: 10*1024,
                    }
                },
                generator: {
                    filename: 'static/images/[name][ext]'
                }
            },
            {
                test: /.(woff2|eot|ttf|otf)/,
                type: 'asset',
                parser: {
                    dataUrlCondition:{
                        maxSize: 10*1024,
                    }
                },
                generator: {
                    filename: 'static/fonts/[name][ext]'
                }
            },
            {
                test: /.(mp4|mp3|webm)/,
                type: 'asset',
                parser: {
                    dataUrlCondition:{
                        maxSize: 10*1024,
                    }
                },
                generator: {
                    filename: 'static/medias/[name][ext]'
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
        }),
        new MiniCssExtractPlugin({
            // content hash: 根据内容生产的hash 内容变了我才有消除缓存的意义
            // 还有 chunk hash
            filename: 'static/css/[name].[contenthash:8].css'
        })
    ]
})