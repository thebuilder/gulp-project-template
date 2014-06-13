var gulp         = require('gulp');
var less         = require('gulp-less');
var plumber      = require('gulp-plumber');
var config       = require('../config');
var handleErrors = require('../util/handleErrors');

gulp.task('less', function () {
    return gulp.src(config.src + '/' + config.lessDir +'/' + config.mainLess)
        .pipe(plumber({errorHandler:handleErrors}))
        .pipe(less())
        .pipe(gulp.dest(config.dist + '/css'))
});
