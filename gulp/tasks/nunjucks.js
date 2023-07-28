module.exports = () => {
	var configHtml = {
		indent_size: 4,
		indent_with_tabs: true,
		preserve_newlines: false,
	};

	// De-caching for Data files
	var requireUncached = function ($module) {
		delete require.cache[require.resolve($module)];
		return require($module);
	};

	app.gulp.task('nunjucks', () => {
		return app.gulp
			.src(`${app.template}/src/pages/*.+(html|njk)`)
			.pipe(app.gulpPlugins.plumber())
			.pipe(
				app.gulpPlugins.data(function () {
					return requireUncached(`../../${app.template}/src/data-json/data.json`);
				}),
			)
			.pipe(
				app.gulpPlugins.nunjucksRender({
					path: `${app.template}/src/`,
					data: {
						src: 'images/',
					},
					manageEnv: function (environment) {
						environment.addFilter('setAttribute', function (dictionary, key, value) {
							dictionary[key] = value;
							return dictionary;
						});

						environment.addFilter('safeWithContext', function (str) {
							const template = environment.renderString(str, this.ctx);
							return environment.filters.safe(template);
						});
					},
				}),
			)
			.pipe(app.gulpPlugins.beautify.html(configHtml))
			.pipe(app.gulp.dest(`${app.template}/dist/`))
			.on('end', app.browserSync.reload);
	});
};
