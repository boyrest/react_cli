const {resolve, join} = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const srcDir = resolve(__dirname, '../src');
const distDir = resolve(__dirname, '../dist');
const webpack = require('webpack');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const WebpackDelPlugin = require('webpack-del-plugin');
const PORT = 9000;

module.exports = {
    entry: {
        js: `${srcDir}/main.js`,
        vendor: ['react', 'classnames', 'react-router', 'react-dom']
    },
    output: {
        filename: '[name].js',
        path: distDir
    },
    devtool: "eval-source-map",
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        contentBase: distDir,
        // compress: true,
        port: PORT,
        host: "0.0.0.0"
    },
    resolve: {
        alias: {
            components: resolve(__dirname, '../src/components'),
            pages: resolve(__dirname + '../src/pages'),
            api: resolve(__dirname + '../src/api'),
            styles: resolve(__dirname + '../src/styles'),
            config: resolve(__dirname + '../src/config')
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }, {
                test: /\.less$/,
                use: [
                    'style-loader', {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                            importLoaders: 1
                        }
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => {
                                require('autoprefixer')()
                            },
                            sourceMap: true
                        }
                    }, {
                        loader: "less-loader",
                        options: {
                            sourceMap: true
                        }
                    }
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
            }, {
                test: /\.(png|jpg|gif)$/,
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
            match: [
                join(distDir, '*.*'),
                join(resolve(distDir, 'assets'), '*.*'),
                join(resolve(distDir, 'fonts'), '*.*')
            ]
        }),
        new webpack.HotModuleReplacementPlugin(),

        // 定义环境变量为开发环境
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
            IS_DEVELOPMETN: true
        }),

        // 根据入口文件，提取重复引用的公共代码类库，打包到单独文件中 new webpack.optimize.OccurenceOrderPlugin(),
        new webpack
            .optimize
            .CommonsChunkPlugin({
                name: 'vendor', // 入口文件名
                filename: 'vendor.bundle.js', // 打包后的文件名
            }),

        new HtmlWebpackPlugin({
            template: resolve(__dirname, '../src/index.html')
        }),
        new OpenBrowserPlugin({url: `http://localhost:${PORT}/`})
    ]
}