const {resolve, join} = require('path');
const srcDir = resolve(__dirname, '../src');
const distDir = resolve(__dirname, '../dist');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackDelPlugin = require('webpack-del-plugin');
const fs = require('fs-extra');

module.exports = {
    entry: {
        js: `${srcDir}/index.jsx`,        
        vendor: ['react', 'classnames', 'react-router', 'react-dom']
    },
    output: {
        filename: '[name].[hash].js',
        path: distDir,
        chunkFilename: '[name].[hash].js'
    },
    resolve:{
        extensions:['', '.js','.jsx']
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }, {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1
                            }
                        }, {
                            loader: 'postcss-loader',
                            options: {
                                //parser: 'postcss-js',
                                plugins: () => {
                                    require('autoprefixer')()
                                }
                            }
                        },
                        'less-loader'
                    ]
                })
            }, {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            'react', 'env'
                        ],
                        plugins: ['react-html-attrs']
                    }
                }
            }, {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'assets/[name]-[hash].[ext]'
                        }
                    }
                ]
            }, {
                test: /\.(ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'fonts/[name]-[hash].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new WebpackDelPlugin({
            match:[
                join(distDir, '*.*'),
                join(resolve(distDir,'assets'), '*.*'),
                join(resolve(distDir,'fonts'), '*.*')
            ]
        }),
        // 定义环境变量为开发环境
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
            IS_DEVELOPMETN: false
        }),
        // 提取css
        new ExtractTextPlugin('vendor.[hash].css'),
        // // 根据入口文件，提取重复引用的公共代码类库，打包到单独文件中 new webpack     .optimize
        // .OccurenceOrderPlugin(),
        new webpack
            .optimize
            .CommonsChunkPlugin({
                name: 'vendor.[hash]', // 入口文件名
                filename: 'vendor.[hash].bundle.js', // 打包后的文件名
            }),

        /* 压缩优化代码开始  可以关掉*/
        new webpack
            .optimize
            .UglifyJsPlugin({minimize: true}),
        /* 压缩优化代码结束*/
        new HtmlWebpackPlugin({
            template: join(__dirname, '../src/index.html')
        })
    ]
}