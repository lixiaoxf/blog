const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
module.exports = merge(common, {
    devtool: 'inline-source-map',
    mode:'development',
    watch:true,
    watchOptions:{
        ignored: '/node_modules/',
        poll: 1000,
        aggregateTimeout:500
    }
});        