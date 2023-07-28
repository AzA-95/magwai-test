module.exports = () => {

	app.gulp.task('jsCopy', function () {
		return app.gulp.src(`${app.template}/src/js/static/*.js`)
			.pipe(app.gulpPlugins.plumber())
			.pipe(app.gulp.dest(`${app.template}/dist/js/static/`))
			.on('end', app.browserSync.reload);
	});

}