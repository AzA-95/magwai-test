module.exports = () => {
	var configHtml = {
		indent_size: 1,
		indent_char: '\t',
		brace_style: 'expand',
		space_before_conditional: false,
		unformatted: ['sub', 'sup', 'b', 'u', 'span', 'a', 'br'],
	};

	app.gulp.task('ajax', () => {
		return app.gulp
			.src(`${app.template}/src/ajax/**/*.+(html|njk)`)
			.pipe(app.gulpPlugins.plumber())
			.pipe(
				app.gulpPlugins.nunjucksRender({
					path: `${app.template}/src/`,
				}),
			)
			.pipe(app.gulpPlugins.beautify.html(configHtml))
			.pipe(app.gulp.dest(`${app.template}/dist/ajax/`))
			.on('end', app.browserSync.reload);
	});
};
