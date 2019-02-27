const Path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const API_BASE = () => {
	if (process.env.NODE_ENV === 'development') {
		return `http://localhost:4000/local`; /// local fake-backend server
	} else {
		return 'http://localhost:5000'; // live server api
	}
};
const SERVER = () => {
	if (process.env.NODE_ENV === 'development') return 'LOCAL_SERVER';
	else return 'REAL_SERVER';
};
module.exports = {
	externals: {
		// global app config object
		config: JSON.stringify({
			apiUrl: API_BASE(),
			server: SERVER()
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
