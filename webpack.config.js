const { DefinePlugin } = require('webpack-plugin-define');
const path = require("path");
const glob = require("glob");
const { EnvironmentPlugin, BannerPlugin } = require("webpack");

let buildTime = Math.floor(Date.now() / 1000);

module.exports = {
	entry: glob.sync("./src/*.ts"),
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "dist")
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js']
	},
	mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
	// do not minimize
	optimization: {
		minimize: false
	},
	performance: {
		hints: false,
		maxEntrypointSize: 512000,
		maxAssetSize: 512000
	},
	plugins: [
		new EnvironmentPlugin({
			version: Math.floor(buildTime).toString(),
		}),
		new BannerPlugin({
			banner: `// ${buildTime}\n\n` +
					`/*           Qweme Custom Scripts           */\n` +
					`/*                                          */\n` +
					`// Build version: ${buildTime}\n` +
			        `// Build date: ${new Date().toLocaleString()}\n` +
					`// Build by: @qweme32\n` +
					`/*                                          */\n` +
					`/*                File Tree                 */\n// ` +
					glob.sync("./src/**/*.ts").join("\n// ") +
					`\n/*                                          */\n`,
			raw: true,
		}),
	],
};
