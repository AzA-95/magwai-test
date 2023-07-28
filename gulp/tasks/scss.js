module.exports = () => {
	const imageInliner = require('postcss-image-inliner');
	const postcssPresetEnv = require('postcss-preset-env');
	const mqPacker = require('css-mqpacker');
	const cssnano = require('cssnano');

	let processors = [
		imageInliner(),
		postcssPresetEnv(),
		mqPacker({
			sort: sortMediaQueries,
		}),
		cssnano({
			preset: [
				'default',
				{
					svgo: false,
					discardComments: {
						removeAll: true,
					},
					minifyFontValues: {
						removeQuotes: false,
					},
				},
			],
		}),
	];

	app.gulp.task('scss', () => {
		return app.gulp
			.src(`${app.template}/src/styles/style.scss`)
			.pipe(app.gulpPlugins.plumber({ errorHandler: handleError }))
			.pipe(app.gulpPlugins.sourcemaps.init())
			.pipe(app.gulpPlugins.sassGlob())
			.pipe(app.gulpPlugins.sass())
			.pipe(app.gulpPlugins.postcss(processors))
			.pipe(
				app.gulpPlugins.if(
					app.mode === 'production',
					app.gulpPlugins.base64({
						baseDir: `${app.template}/src/images/`,
						extensions: ['svg', 'png', /\.jpg#datauri$/i],
						exclude: [/\.server\.(com|net)\/dynamic\//, '--live.jpg'],
						maxImageSize: 8 * 1024, // bytes
						debug: true,
					}),
				),
			)
			.pipe(app.gulpPlugins.sourcemaps.write('.'))
			.pipe(app.gulp.dest(`${app.template}/dist/css/`))
			.pipe(
				app.browserSync.reload({
					stream: true,
				}),
			);
	});
};

function handleError(err) {
	console.log(err.toString());
	this.emit('end');
}

function isMax(mq) {
	return /max-width/.test(mq);
}

function isMin(mq) {
	return /min-width/.test(mq);
}

function sortMediaQueries(a, b) {
	let A = a.replace(/\D/g, '');

	let B = b.replace(/\D/g, '');

	if (isMax(a) && isMax(b)) {
		return B - A;
	} else if (isMin(a) && isMin(b)) {
		return A - B;
	} else if (isMax(a) && isMin(b)) {
		return 1;
	} else if (isMin(a) && isMax(b)) {
		return -1;
	}

	return 1;
}
