var gulp = require("gulp");
var jshint = require("gulp-jshint");
var gulpif = require("gulp-if");
var plumber = require("gulp-plumber");
var cache = require('gulp-cached');

var handleErrors = require('../util/handleErrors');
var config = require("../config");

gulp.task('lint', function() {
    return gulp.src(config.src + config.jsDir + '**/*.js')
        .pipe(plumber({errorHandler:handleErrors}))
        .pipe(gulpif(!config.isReleaseBuild,
            cache('linting') //Only processes changed files
        ))
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        //If release build, jshint should be enforced
        .pipe(gulpif(config.isReleaseBuild, jshint.reporter('fail')));
});
