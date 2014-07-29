var gulp = require('gulp');

gulp.task('bower', function () {
    //Require in task, to improve startup time
    var gulpif      = require('gulp-if');
    var filter      = require('gulp-filter');
    var concat      = require('gulp-concat');
    var uglify      = require('gulp-uglify');
    var gutil       = require('gulp-util');
    var rename      = require('gulp-rename');
    var sourcemaps  = require('gulp-sourcemaps');
    var minifyCSS   = require('gulp-minify-css');
    var bowerFiles  = require('main-bower-files');
    var es          = require('event-stream');

    var plumber     = require('gulp-plumber');
    var config      = require('../config');
    var streams = [];

    //Concat all the Bower JS libs
    streams.push(
        gulp.src(bowerFiles())
            .pipe(plumber())
            .pipe(filter('**/*.js'))
            .pipe(sourcemaps.init())
            .pipe(concat('vendor.min.js'))
            .pipe(uglify({mangle: false}))
            .pipe(gulpif(!config.isReleaseBuild, sourcemaps.write()))
            .pipe(rename(function (path) {
                path.dirname = "js";
                gutil.log("Output: " + gutil.colors.yellow(path.dirname + "/" + path.basename + path.extname));
            }))
    );

    //Concat all the Bower CSS libs
    streams.push(
        gulp.src(bowerFiles())
            .pipe(plumber())
            .pipe(filter('**/*.css'))
            .pipe(sourcemaps.init())
            .pipe(concat('vendor.min.css'))
            .pipe(gulpif(config.isReleaseBuild, minifyCSS({keepBreaks: true})))
            .pipe(gulpif(!config.isReleaseBuild, sourcemaps.write()))
            .pipe(rename(function (path) {
                path.dirname = "css";
                gutil.log("Output: " + gutil.colors.yellow(path.dirname + "/" + path.basename + path.extname));
            }))
    );

    //Output the vendor files to the dist directory.
    return es.merge.apply(this, streams)
        .pipe(plumber())
        .pipe(gulp.dest(config.dist))
});