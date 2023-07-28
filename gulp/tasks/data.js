module.exports = () => {

	app.gulp.task('data', () => {
		return app.gulp.src(`${app.template}/src/data/**/*`)
			.pipe(app.gulp.dest(`${app.template}/dist/data/`))
			.on('end', app.browserSync.reload);
	});

}
