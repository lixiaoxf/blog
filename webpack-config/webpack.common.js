const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ManifestPlugin =  require('webpack-manifest-plugin');

const basePath = path.resolve(__dirname, "../");
const publicPath = path.resolve(basePath,'app/public/')
const staticPath = path.resolve(basePath,'static/')

const glob = require("glob")
function getentry(){
    var files = glob.sync('static/**/!(js)/index.js')
    let map = {};
    files.forEach(item => {
        var key = /static\/(.*).js$/g.exec(item)[1]
        map[key] = './'+key+'.js';
    });
    return map;
}
let m = require('./mod.js')
module.exports = {
    entry: getentry(),
    context: staticPath,
    output: {
        filename: 'js/[name].[chunkhash].js',
        path: publicPath,
        hashFunction:function(){
            return {
                update:function(){
                    return m.getV();
                },
                digest:function(){
                    return m.getV();
                }
            };
        },
        chunkFilename: 'js/[name].chunk.js'
    },
    optimization: {
        splitChunks: {
          chunks: 'all',
          minSize: 30000,
          maxSize: 0,
          minChunks: 1,
          maxAsyncRequests: 5,
          maxInitialRequests: 3,
          name: 'common/index',
          cacheGroups: {
            default: {
                minChunks: 2,
                priority: -20,
                name: "common/default",
                chunks: "all",
                reuseExistingChunk: true,
            },
            vendors: {
                name: "common/vendors",
                chunks: "all",
                test: /[\\/]node_modules[\\/]/,
                priority: -10
            }
          }
        }
    },
    resolve:{
        alias:{
            '@':staticPath,
            // 'rem':path.resolve(staticPath, 'common/js/flexible/rem.js'),
        },
        extensions:[
            '.js',
            '.json'
        ]
    },
    module:{
        rules:[
            {
                test: /\.html$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        attrs: ['img:src', 'img:data-src', 'audio:src'],
                        minimize: true
                    }
                }
            },
            
            {
                test: /\.css$/,
                use: ['style-loader','css-loader']
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader', 
                        'sass-loader',
                    {
                        loader:"postcss-loader",
                        options: {
                            plugins: [
                                require("autoprefixer") 
                            ]
                        }
                    }
                ]
                })
            },
            { 
                test:/\.(png|jpg|jpeg|gif)$/,
                use:[
                    
                    {// base64图片
                        loader:'url-loader',
                        options:{
                            name:'res/[path][name][hash:5].min.[ext]',
                            publicPath:'/',
                            limit: 1000
                        }
                    },
                    {// 压缩图片
                        loader:'img-loader',
                        options:{
                            pngquant:{ // png图片适用
                                quality: 80
                            }
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                }  
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['app/public'],{
            root: path.resolve(__dirname, '../'), //根目录
            
            verbose: true, 
            dry: false,
        }),
        new ExtractTextPlugin({
            filename:'css/[name].css'
        }),
        new ManifestPlugin(),
        new CopyWebpackPlugin([
            {
                from: {
                    glob:'**/*/view/**',
                    dot: true
                },
                to: '../view/[path]/../[name].[ext]'
            }
        ]),
    ]
}