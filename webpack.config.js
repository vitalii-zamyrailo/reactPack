const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
	entry: {
		index: path.resolve(__dirname, 'source', 'index.js'),
	},

	output: {
		path: path.resolve(__dirname, 'build'),
	},

	module: {
		rules: [
			{
				test: /\.scss$/i,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
			},
			{
				test: /\.js$/i,
				use: ['babel-loader'],
			},
		],
	},

	plugins: [
		new BundleAnalyzerPlugin(),
		new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /ua/),
		new MiniCssExtractPlugin(),
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'source', 'index.html'),
		}),
	],

	optimization: {
		splitChunks: {
			chunks: 'all',
			cacheGroups: {
				react: {
					test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
					name: 'react',
				},
				moment: {
					test: /[\\/]node_modules[\\/](moment)[\\/]/,
					name: 'moment',
				},
				vendors: {
					test: /[\\/]node_modules[\\/](!react)(!react-dom)(!moment)[\\/]/,
					// name doesn't work?
				},
			},
		},
	},
};
