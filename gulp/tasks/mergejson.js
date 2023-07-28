module.exports = () => {

	app.gulp.task('mergeJson', () => {

		return app.gulp.src(`${app.template}/src/components/**/*.json`)
			.pipe(app.gulpPlugins.mergeJson({
				fileName: 'data.json'
			}))
			.pipe(app.gulp.dest(`${app.template}/src/data-json/`));

	});

};