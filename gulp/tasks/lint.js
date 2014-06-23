var gulp = require("gulp");
var jshint = require("gulp-jshint");
var gulpif = require("gulp-if");
var config = require("../config");

gulp.task('lint', function() {
    return gulp.src(config.src + '/' + config.jsDir + '/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        //If release build, jshint should be enforced
        .pipe(gulpif(config.isReleaseBuild, jshint.reporter('fail')));
});
