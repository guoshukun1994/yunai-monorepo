const getBaseCfg = require('./webpack.base');
const { merge } = require('webpack-merge');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

// 优化, 压缩, 分治。 
module.exports = merge(getBaseCfg(false), {  // false表示非开发环境 即线上prod

    optimization: {
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin({
                // 并行压缩
                parallel: true,
                terserOptions: {
                    compress: {
                        pure_funcs: ['console.log', "console.warn"]
                    }
                }
            })
        ],
        splitChunks: {
            cacheGroups: {
                vendors: {
                    priority: 1,
                    test: /node_modules/,
                    name: 'vendors',
                    // minchunk, chunks, minsize
                }
            },
            commons: {
                name: 'commons',
                minChunks: 3,
            }
        }
    }
})