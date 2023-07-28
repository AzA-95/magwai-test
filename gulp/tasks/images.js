module.exports = () => {
	app.gulp.task('images', () => {
		return app.gulp
			.src(`${app.template}/src/images/**/*.+(jpg|png|jpeg|gif|svg|webp)`)
			.pipe(
				app.gulpPlugins.cache(
					app.gulpPlugins.imagemin([
						app.gulpPlugins.imagemin.gifsicle({
							interlaced: true,
						}),
						app.gulpPlugins.imagemin.jpegtran({
							progressive: true,
						}),
						app.gulpPlugins.imagemin.optipng({
							optimizationLevel: 5,
						}),
						app.gulpPlugins.imagemin.svgo({
							plugins: [
								{
									removeViewBox: true,
								},
								{
									cleanupIDs: false,
								},
							],
						}),
					]),
				),
			)
			.pipe(app.gulp.dest(`${app.template}/dist/images/`))
			.pipe(app.gulpPlugins.cache(app.gulpPlugins.webp()))
			.pipe(app.gulp.dest(`${app.template}/dist/images/`))
			.on('end', app.browserSync.reload);
	});
};
