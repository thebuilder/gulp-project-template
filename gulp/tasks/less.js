var gulp         = require('gulp');

gulp.task('less', function () {
    //Require in task, to improve startup time
    var less         = require('gulp-less');
    var autoprefixer = require('gulp-autoprefixer');
    var sourcemaps   = require('gulp-sourcemaps');
    var gulpif       = require('gulp-if');
    var plumber      = require('gulp-plumber');
    var minifyCSS    = require('gulp-minify-css');

    var config       = require('../config');
    var handleErrors = require('../util/handleErrors');

    return gulp.src(config.less.src)
        .pipe(plumber({errorHandler:handleErrors}))
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(gulpif(!config.isReleaseBuild, sourcemaps.write({sourceRoot:"../source/less"})))
        //Auto add vendor prefixes. See https://www.npmjs.org/package/gulp-autoprefixer for details on defining browser support
        .pipe(gulpif(config.isReleaseBuild, autoprefixer())) //Autoprefixer does not work with gulp-sourcemaps yet, so skip it untill release build.
        .pipe(gulpif(config.isReleaseBuild, minifyCSS({keepBreaks:true})))
        .pipe(gulp.dest(config.dist + config.less.dir))
});
