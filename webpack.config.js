const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OptimizeJsPlugin = require('optimize-js-plugin');


//webpack.config.js
module.exports = {
    entry: (env !== 'production' ? [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
    ] : []).concat(['./client/index.js']),
    output: {
      filename: './bundle.js',
      path: path.resolve(__dirname, 'public')
        },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            filename: 'index.html',
            inject: 'body'
        }),
        new webpack.optimize.UglifyJsPlugin(),
        new OptimizeJsPlugin({
          sourceMap: false
        })
    ],

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
};
const env = process.env.NODE_ENV;
console.log('NODE_ENV:', env);
