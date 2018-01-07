const React = require('react');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OptimizeJsPlugin = require('optimize-js-plugin');
const env = process.env.NODE_ENV || 'development';
console.log('NODE_ENV:', env);
const prodPlugins = [
    new webpack.optimize.UglifyJsPlugin(),
    new OptimizeJsPlugin({sourceMap: false})
    ];
const allPlugins = [
    new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html',
            inject: 'body'
        })
].concat(env === "production" ? prodPlugins : []);

//webpack.config.js
module.exports = {
    entry: (env !== 'production' ? [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
    ] : []).concat(['./client/index.js']),
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'app.bundle.js'
    },
    plugins: allPlugins,

    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader"
            },
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader'},
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    }
                ]               
            }
        ]
    }
}