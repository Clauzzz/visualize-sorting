const path = require("path");
const glob = require('glob');
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require('terser-webpack-plugin'); // For JS minification
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin'); // For CSS minification
const HtmlWebpackPlugin = require('html-webpack-plugin'); // For generating HTML files
const CopyPlugin = require('copy-webpack-plugin')

const plugins = [
    new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: "css/[name].css",
        chunkFilename: "[id].css"
    }),
    new HtmlWebpackPlugin({
        template: './src/html/index.html', // Optional: Path to your HTML template
        filename: 'index.html',     // Output filename in the 'dist' directory
        inject: false,
    }),
    new CopyPlugin({
        patterns: [
            {
                from: path.resolve(__dirname, 'src', 'images'), // Source directory relative to webpack.config.js
                to: path.resolve(__dirname, 'dist', 'images'),   // Destination directory inside your output (dist) folder
                noErrorOnMissing: true, // Optional: Prevents an error if the 'from' directory doesn't exist
            },
        ],
    }),
];
plugins.push(new webpack.HotModuleReplacementPlugin());


module.exports = {
    mode: 'production',
    entry: {
        'styles': path.resolve(__dirname, 'src', 'styles', 'general.scss'),
        'canvas': path.resolve(__dirname, 'src', 'scripts', 'canvas.js'),
        'main': path.resolve(__dirname, 'src', 'scripts', 'main.js'),
        'number': path.resolve(__dirname, 'src', 'scripts', 'number.js'),
        'point': path.resolve(__dirname, 'src', 'scripts', 'point.js'),
        'sorting': path.resolve(__dirname, 'src', 'scripts', 'sorting.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'scripts/[name].js'
    },
    plugins,
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader', // Assuming you have .babelrc or babel.config.js
                    options: {
                        presets: ['@babel/preset-env'], // Example preset
                    },
                },
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                    "sass-loader",
                ],
                include: path.resolve(__dirname, "src", "styles"),
            }

        ],
    },
    // Optimization settings for production
    optimization: {
        minimize: false,
        minimizer: [

            // 1. Minify JavaScript using TerserPlugin
            new TerserPlugin({
                terserOptions: {
                    compress: {
                        drop_console: false, // Remove console.log statements
                    },
                    format: {
                        comments: false, // Remove all comments from the output JS
                    },
                },
                extractComments: false, // Do not extract comments to a separate file
                parallel: false, // Use multi-process parallelization for faster builds
            }),

            // 2. Minify CSS using CssMinimizerPlugin
            new CssMinimizerPlugin({
                minimizerOptions: {
                    preset: [
                        'default',
                        {
                            discardComments: { removeAll: true }, // Remove all comments from CSS
                        },
                    ],
                },
            }),
        ],
        splitChunks: {
            chunks: 'all',
        },
    }

};