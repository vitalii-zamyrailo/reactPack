const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const ASSET_PATH = process.env.ASSET_PATH || '/';

module.exports = {
	devServer: {
		historyApiFallback: true,
	},

	entry: {
		index: path.resolve(__dirname, '../source', 'index.js'),
	},

	output: {
		clean: true,
		filename: '[name].[contenthash].js',
		path: path.resolve(__dirname, '../build'),
		publicPath: ASSET_PATH,
	},

	module: {
		rules: [
			{
				test: /\.scss$/i,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
			},
			{
				test: /\.js$/i,
				use: ['cache-loader', 'babel-loader'],
			},
		],
	},

	plugins: [
		new BundleAnalyzerPlugin(),
		new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /ua/),
		new MiniCssExtractPlugin(),
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, '../public', 'index.html'),
			favicon: path.resolve(__dirname, '../public', 'favicon.ico'),
		}),
		new webpack.DefinePlugin({
			'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH),
		}),
],

	optimization: {
		moduleIds: 'deterministic',
		runtimeChunk: 'single',
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
					name: 'vendors',
				},
			},
		},
	},
};
