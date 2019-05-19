const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const basePath = path.resolve(__dirname, "../");
const publicPath = path.resolve(basePath,'app/public/')
const staticPath = path.resolve(basePath,'static/')

const glob = require("glob")

let conf = {
    enters:{},
    pages:[],
    init(){
        this.initEnters();
        this.initPages();
    },
    initEnters(){
        var files = glob.sync('static/**/!(js)/index.js')
        let map = {};
        files.forEach(item => {
            var key = /static\/(.*).js$/g.exec(item)[1]
            map[key] = './'+key+'.js';
        });
       
        this.enters = map;
    },
    initPages(){
        var list = Object.keys(this.enters)
        var pagelist = []
        list.forEach(item => {
            let curpath = item.substring(0,item.lastIndexOf('/'))
            pagelist.push(
                new HtmlWebpackPlugin({
                    template:path.resolve(staticPath,`${curpath}/view/index.nj`),
                    filename:path.resolve(basePath, `app/view/${curpath}/index.nj`),
                    chunks:[
                        "common/default",
                        "common/vendors",
                        item
                    ],
                    minify:{
                        collapseWhitespace:true
                    }
                })
            )
        })
        this.pages = pagelist;
    }
}
conf.init();

console.log(conf.pages)
module.exports = {
    entry: conf.enters,
    context: staticPath,
    output: {
        filename: '[name].[chunkhash:7].js',
        path: publicPath, 
        publicPath:'/',
        chunkFilename: '[name].[chunkhash:7].js'
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
            // {
            //     test: /\.nj$/,
            //     use: {
            //         loader: 'html-loader',
            //         options: {
            //             attrs: ['img:src', 'img:data-src', 'audio:src'],
            //             // minimize: true
            //         }
            //     }
            // },
            {
                test: /\.css$/,
                use: ['style-lo ader','css-loader']
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
            filename:'[name].[chunkhash:7].css'
        }),
        
        ...conf.pages
        
    ]
}