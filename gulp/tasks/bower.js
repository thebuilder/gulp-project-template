var gulp = require('gulp');

gulp.task('bower', function () {
    //Require in task, to improve startup time
    var gulpif      = require('gulp-if');
    var filter      = require('gulp-filter');
    var concat      = require('gulp-concat');
    var uglify      = require('gulp-uglify');
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
            //.pipe(sourcemaps.init())
            .pipe(concat('vendor.min.js'))
            .pipe(uglify({mangle: false}))
            //.pipe(gulpif(!config.isReleaseBuild, sourcemaps.write()))
            .pipe(gulp.dest(config.dist + config.js.dir ))
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
            .pipe(gulp.dest(config.dist + config.less.dir))
    );

    return es.merge.apply(this, streams);
});