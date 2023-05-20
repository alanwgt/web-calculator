/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const PreactRefreshPlugin = require('@prefresh/webpack');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
    mode: isProd ? 'production' : 'development',
    entry: {
        main: './src/index.tsx',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        clean: true,
    },
    devServer: {
        watchFiles: ['src/**/*.tsx?', 'src/**/*.html'],
        hot: true,
    },
    devtool: isProd ? false : 'inline-source-map',
    plugins: [
        new webpack.ProvidePlugin({
            h: ['preact', 'h'],
            Fragment: ['preact', 'Fragment'],
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            title: 'WebCalculator',
        }),
        new webpack.HotModuleReplacementPlugin(),
        new PreactRefreshPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'swc-loader',
                    options: {
                        sync: true,
                        jsc: {
                            parser: {
                                syntax: 'typescript',
                            },
                            transform: {
                                react: {
                                    pragma: 'h',
                                    pragmaFrag: 'Fragment',
                                },
                            },
                        },
                    },
                },
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    'cssnano',
                                    'postcss-preset-env',
                                    'postcss-extend-rule',
                                ],
                            },
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            '@': path.resolve(__dirname, 'src/components/'),
            '#': path.resolve(__dirname, 'src/types/'),
            react: 'preact/compat',
            'react-dom/test-utils': 'preact/test-utils',
            'react-dom': 'preact/compat', // Must be below test-utils
            'react/jsx-runtime': 'preact/jsx-runtime',
        },
    },
};
