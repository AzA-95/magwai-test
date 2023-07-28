module.exports = () => {

	app.gulp.task('favicons', function () {
		return app.gulp.src(`${app.template}/src/favicons/*`)
			.pipe(app.gulpPlugins.plumber())
			.pipe(app.gulp.dest(`${app.template}/dist/favicons/`))
	});

}