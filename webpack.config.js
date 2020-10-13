const path = require("path");
const webpack = require("webpack");
const resolve = (url) => path.join(__dirname, url);
/**
 * @param {{prod?:boolean}} env
 * @returns {import("webpack/declarations/WebpackOptions").WebpackOptions}
 * */
module.exports = (env) => {
	return {
        context:resolve("src"),
		mode: env.prod ? "production" : "development",
		entry: resolve("src/main.ts"),
		output: {
			path: resolve("lib"),
			filename: "mbh.min.js",
			library: "mbh",
			libraryTarget: "umd",
		},
		resolve: {
            extensions:['.ts','.js']
		},
		module: {
			rules: [
				{
					test: /\.ts$/,
					loader: "babel-loader",
					options: {
						presets: [
							[
								"@babel/preset-env",
								{
									targets: {
										ios: "8",
										android: "4",
									},
									loose: true,
								},
							],
							"@babel/preset-typescript",
                        ],
                        plugins:[
                            "@babel/plugin-proposal-export-namespace-from",
                            "@babel/plugin-proposal-export-default-from"
                        ]
					},
				},
			],
		},
		devServer: env.prod
			? undefined
			: {
					contentBase: resolve("/"),
					port: 9000,
					host: "0.0.0.0",
					hot: true,
			  },
		plugins: [!env.prod && new webpack.HotModuleReplacementPlugin()].filter(
			(item) => item
		),
	};
};
