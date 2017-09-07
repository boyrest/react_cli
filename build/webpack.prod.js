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
        js: `${srcDir}/main.js`,
        vendor: ['react', 'classnames', 'react-router', 'react-dom']
    },
    output: {
        filename: '[name].[hash].js',
        path: distDir,
        chunkFilename: '[name].[hash].js'
    },
    resolve: {
        alias: {
            components: resolve(__dirname, '../src/components'),
            pages: resolve(__dirname + '../src/pages'),
            api: resolve(__dirname + '../src/'),
            styles: resolve(__dirname + '../src/styles')
        }
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'style-loader', {
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
                    'sass-loader'
                ]
            }, {
                test: /\.js$/,
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
            }
        ]
    },
    plugins: [
        new WebpackDelPlugin({
            match: join(distDir, '*.*')
        }),
        // 定义环境变量为开发环境
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
            IS_DEVELOPMETN: false
        }),
        // 提取css
        new ExtractTextPlugin('vendor.[hash].css'),
        // // 根据入口文件，提取重复引用的公共代码类库，打包到单独文件中
        // new webpack
        //     .optimize
        //     .OccurenceOrderPlugin(),
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