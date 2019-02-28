const Path = require('path');
const fs = require('fs');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { SERVER, API_BASE } = require('./config'); // can configure in config

const dir = './public';
if (!fs.existsSync(dir)) {
	fs.mkdirSync(dir);
}

module.exports = {
	externals: {
		// global app config object
		config: JSON.stringify({
			apiUrl: API_BASE(),
			server: SERVER(),
			NODE_ENV: process.env.NODE_ENV
		})
	},
	entry: {
		app: Path.resolve(__dirname, '../src/index.js')
	},
	output: {
		path: Path.join(__dirname, '../build'),
		filename: 'js/[name].js'
	},

	plugins: [
		new CleanWebpackPlugin([ 'build' ], { root: Path.resolve(__dirname, '..') }),
		new CopyWebpackPlugin([ { from: Path.resolve(__dirname, '../public'), to: 'public' } ]),
		new HtmlWebpackPlugin({
			template: Path.resolve(__dirname, '../src/index.html')
		})
	],
	resolve: {
		extensions: [ '.js', '.vue' ]
		// alias: {
		//   '~': Path.resolve(__dirname, '../src')
		// }
	},
	module: {
		rules: [
			{
				test: /\.vue?$/,
				exclude: /(node_modules)/,
				use: 'vue-loader'
			},
			{
				test: /\.mjs$/,
				include: /node_modules/,
				type: 'javascript/auto'
			},
			{
				test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
				use: {
					loader: 'file-loader',
					options: {
						name: '[path][name].[ext]'
					}
				}
			}
		]
	}
};
