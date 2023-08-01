const getBaseCfg = require('./webpack.base');
const { merge } = require('webpack-merge');
const path = require('path');

module.exports = merge(getBaseCfg(false), {  // false表示非开发环境 即线上prod

})