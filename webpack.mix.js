/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */
const mix = require('laravel-mix');
const path = require("path");
const webpack = require("webpack");

module.exports = {
    entry: "./src/index.js",
    mode: "development",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
                options: { presets: ["@babel/env"] }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },
    resolve: { extensions: ["*", ".js", ".jsx"] },
    output: {
        path: path.resolve(__dirname, "public/js"),
        publicPath: "http://localhost:3000/js/",
        filename: "app.js"
    },
    devServer: {
        contentBase: path.join(__dirname, "public/"),
        headers: { 'Access-Control-Allow-Origin': '*' },
        port: 3000,
        hotOnly: true
    },
    plugins: [new webpack.HotModuleReplacementPlugin()]
};
mix.react('resources/js/app.js', 'public/js')
    .sass('resources/sass/app.scss', 'public/css');;
