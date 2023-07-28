'use strict';

var del = require('del');
var glob = require('glob');
var gulp = require('gulp');
var named = require('vinyl-named')
var gulpPlugins = require('gulp-load-plugins')();
var browserSync = require('browser-sync').create();
var webpack = require('webpack');
var gulpWebpack = require('webpack-stream');
var tasks = require('./gulp/config/tasks');
var config = require('./config.json');
var template = config.template;
var productionPath = config.path;

global.app = {};
global.app.del = del;
global.app.glob = glob;
global.app.gulp = gulp;
global.app.named = named;
global.app.gulpPlugins = gulpPlugins;
global.app.browserSync = browserSync;
global.app.webpack = webpack;
global.app.gulpWebpack = gulpWebpack;
global.app.mode = process.env.NODE_ENV || 'development';
global.app.template = template;
global.app.path = productionPath;

tasks.forEach(function (taskPath) {
	require(taskPath)();
});

gulp.task('default', gulp.parallel('js', 'watch', 'webserver'));

gulp.task('build', gulp.series('clean', gulp.parallel('js', 'jsCopy', 'scss', 'images', 'fonts', 'favicons', 'nunjucks', 'ajax')));