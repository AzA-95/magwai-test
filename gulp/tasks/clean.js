module.exports = () => {

	app.gulp.task('clean', () => {
		return app.del(`${app.template}/dist`, {force: true});
	});

}
