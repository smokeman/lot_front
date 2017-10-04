const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const merge = require('webpack-merge')
const webpackBaseConfig = require('./webpack.config')

webpackBaseConfig.plugins = []

module.exports = merge(webpackBaseConfig,{
    output:{
        publicPath:'/dist/',
        filename:'[name].[hash].js'
    },
    plugins:[
        new ExtractTextPlugin({
            filename:'[name].[hash].css',
            allChunks:true //把所有分支的css都提取出来
        }),
        new webpack.DefinePlugin({
            'process.env':{
                NODE_ENV:'"production"'
            }
        }),
        // new webpack.optimize.UglifyJsPlugin({
        //     compress:{
        //         warnings:false
        //     }
        // }),
        new HtmlWebpackPlugin({
            filename:'../index_prod.html',
            template:'./index.ejs',
            inject:false
        })
    ]
})