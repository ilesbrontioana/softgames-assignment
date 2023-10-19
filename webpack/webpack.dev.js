const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const pk = require('./../package.json');
const webpack = require("webpack");

const {
    prod_Path,
} = require('./path');

module.exports = {
    entry: {
        main: [
            './Start.js'
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    output: {
        path: path.resolve(__dirname, prod_Path),
        filename: 'game.js'
    },
    devtool: 'source-map',
    devServer: {
        open: true,
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: false,
            hash: false,
            template: './index.html',
            filename: 'index.html'
        }),
        new CopyPlugin([
            {
                from: 'assets',
                to: 'dest'
            },
        ]),
        new webpack.DefinePlugin({
            GAME_VERSION: JSON.stringify(pk.version)
        }),
        new webpack.ProvidePlugin({
            PIXI: 'pixi.js'
        }),
    ]
};