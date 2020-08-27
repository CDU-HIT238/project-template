var gulp = require('gulp');
var yargs = require('yargs');
var gulpSass = require('gulp-sass');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var args = yargs.argv;

sass.compiler = require('node-sass');

function js() {
	return browserify({entries: 'src/js/start.js', debug: !args.prod})
		.transform('babelify', {presets: ['@babel/preset-env']})
		.bundle()
		.pipe(source('start.js'))
		.pipe(buffer())
		.pipe(gulp.dest('./build/'));
}

function sass(cb) {
	cb();
	console.log('OK?');
	return gulp.src('src/styles/style.scss')
		.pipe(gulpSass())
		.pipe(gulp.dest('./build/'));
}

function views() {
	return gulp.src('src/views/**/*')
		.pipe(gulp.dest('./build/'));
}

function images() {
	return gulp.src('src/images/*')
		.pipe(gulp.dest('./build/images/'));
}

function watch() {
	gulp.watch('src/styles/*', sass);
	gulp.watch('src/views/*', views);
	gulp.watch('src/js/*', js);
	gulp.watch('src/images/*', images);
}

exports.js = js;
exports.sass = sass;
exports.views = views;
exports.images = images;
exports.watch = watch;
exports.default = gulp.parallel([js, sass, views, images]);
