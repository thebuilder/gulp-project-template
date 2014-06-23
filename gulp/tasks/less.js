var gulp         = require('gulp');
var less         = require('gulp-less');
var gulpif       = require('gulp-if');
var plumber      = require('gulp-plumber');
var minifyCSS    = require('gulp-minify-css');

var config       = require('../config');
var handleErrors = require('../util/handleErrors');

gulp.task('less', function () {
    return gulp.src(config.src + '/' + config.lessDir +'/' + config.mainLess)
        .pipe(plumber({errorHandler:handleErrors}))
        .pipe(less({
            sourceMap:!config.isReleaseBuild
        }))
        .pipe(gulpif(config.isReleaseBuild, minifyCSS({keepBreaks:true})))
        .pipe(gulp.dest(config.dist + '/css'))
});
