 var path = require('path');
 var webpack = require("webpack");
 var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
 var HtmlWebpackPlugin = require("html-webpack-plugin");
 module.exports = {
     entry: './app/main.ts',
     output: {
         path: __dirname + '/dist',
         filename: "bundle.js"
     },
     module: {
    rules: [
         {
            test: /\.tsx?$/,
            loaders: ['ts-loader'],
            exclude: /node_modules/,
         },
         {
            test: /\.html$/,
            loader: 'html-loader'
         },
         {
            test: /\.css$/,
            loader: 'raw-loader'
        }
     ]
    },
    resolve: {
       extensions: [".tsx", ".ts", ".js"]
    },
    plugins: [
        new BrowserSyncPlugin(),
        new webpack.ProvidePlugin({
            $:"jquery",
            jQuery:"jquery",
            "window.jQuery":"jquery"
        }),
    ],
    devServer: {
        contentBase: path.join(__dirname),
        publicPath: '/dist',
        compress: true,
        hot: true
    }
 };