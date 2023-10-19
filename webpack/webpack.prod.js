const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const pk = require('./../package.json');
const webpack = require("webpack");

const {
    prod_Path,
} = require('./path');

module.exports = {
    entry: {
        app: [
            './Start.js'
        ],
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    output: {
        path: path.resolve(__dirname, prod_Path),
        filename: 'game.js'
    },
    module: {
        rules: [{
            test: /\.ts?$/,
            use: 'ts-loader',
            exclude: /node_modules/
        }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(path.resolve(__dirname, prod_Path), {
            root: process.cwd()
        }),
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            template: './index.html',
            filename: 'index.html'
        }),
        new WebpackMd5Hash(),
        new CopyPlugin([
            {from: 'assets', to: 'assets'},
        ]),
        new webpack.DefinePlugin({
            GAME_VERSION: JSON.stringify(pk.version)
        })
    ]
};
