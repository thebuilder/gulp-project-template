var gulp         = require('gulp');
var gulpif       = require('gulp-if');
var uglify       = require('gulp-uglify');
var browserify   = require('browserify');
var streamify    = require('gulp-streamify')
var plumber      = require('gulp-plumber');
var source       = require('vinyl-source-stream');
var handleErrors = require('../util/handleErrors');
var config       = require('../config');

gulp.task('browserify', function(){
	return browserify("./" + config.src + '/' + config.jsDir + '/' + config.mainJs)
		.on('error', handleErrors)
		.bundle({debug: !config.isReleaseBuild})
		.on('error', handleErrors)

        .pipe(plumber({errorHandler:handleErrors}))
		.pipe(source(config.mainJs))
        //Uglify if release build
        .pipe(gulpif(config.isReleaseBuild, streamify(uglify())))//Wrap uglify in streamify, so it supports the stream
        .pipe(gulp.dest(config.dist + '/js/'));
});
