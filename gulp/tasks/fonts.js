module.exports = () => {

	app.gulp.task('fonts', () => {
		return app.gulp.src(`${app.template}/src/fonts/**/*.+(eot|otf|ttf|woff|woff2)`)
			.pipe(app.gulp.dest(`${app.template}/dist/css/fonts/`))
			.on('end', app.browserSync.reload);
	});

}
