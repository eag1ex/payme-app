const Path = require('path');
const Webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const common = require('./webpack.comm.js');

// todo
// https://www.npmjs.com/package/mini-css-extract-plugin

module.exports = merge(common, {
	mode: 'production',
	devtool: 'source-map',
	stats: 'errors-only',
	bail: true,
	output: {
		filename: 'js/[name].[chunkhash:8].js',
		chunkFilename: 'js/[name].[chunkhash:8].chunk.js'
	},
	optimization: {
		splitChunks: {
			chunks: 'all',
			name: true
		},
		minimizer: [
			new UglifyJsPlugin({
				cache: true,
				parallel: true,
				sourceMap: true // set to true if you want JS source maps
			}),
			new OptimizeCSSAssetsPlugin({})
		]
	},
	plugins: [
		new Webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production'),
			// 'process.env.publicPath': JSON.stringify('payme-app'),
			'process.env.FUNCTION_CODE': JSON.stringify('DFKJ884576*_35465fdjfuyrt+_*45@%_=_*56%@!~^')
		}),
		new Webpack.optimize.ModuleConcatenationPlugin(),
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[id].css'
		})
	],

	module: {
		rules: [
			{
				test: /\.(js)$/,
				exclude: /node_modules/,
				use: 'babel-loader'
			},
			{
				test: /\.s?css/i,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
			}
		]
	}
});
