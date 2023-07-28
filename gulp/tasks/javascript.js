const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = () => {

	app.gulp.task('js', function() {
		return app.gulp.src(`${app.template}/src/js/app.js`)
			.pipe(app.gulpPlugins.plumber())
			.pipe(app.gulpWebpack({
				output: {
					path: path.resolve(__dirname, `${app.template}/dist`),
					filename: 'js/[name].bundle.js',
					chunkFilename: 'js/chunks/[name].[chunkhash].js',
					publicPath: app.mode === 'production' ? app.path : ''
				},
				mode: global.app.mode,
				devtool: 'source-map',
				module: {
					rules: [{
						test: /\.js$/,
						exclude: /node_modules/,
						use: [{
							loader: 'babel-loader'
						}]
					}]
				},
				optimization: {
					usedExports: true,
					minimize: app.mode === 'production',
					minimizer: [new TerserPlugin({
						terserOptions: {
							format: {
								comments: false,
							},
						},
						extractComments: false,
					})],
				},
			}, app.webpack))
			.pipe(app.gulp.dest(`${app.template}/dist/`))
			.on('end', app.browserSync.reload);
	});

}