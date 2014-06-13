var gulp         = require('gulp');
var jade         = require('gulp-jade');
var changed      = require('gulp-changed');
var plumber      = require('gulp-plumber');
var handleErrors = require('../util/handleErrors');
var config       = require('../config');

gulp.task('jade', function() {
    return gulp.src(config.src + '/' + config.jadeFiles)
        .pipe(plumber({errorHandler:handleErrors}))
        .pipe(changed(config.dist, { extension: '.html' })) // Ignore unchanged files
        .pipe(jade({pretty: true}))
        .pipe(gulp.dest(config.dist));
});
