var gulp         = require('gulp');
var changed      = require('gulp-changed');
var plumber      = require('gulp-plumber');
var config       = require('../config');

/**
 * Copy all assets from the following dirs to build directory
 **/
gulp.task('assets', function () {
    var dest = config.dist + '/';

    return gulp.src([
            'fonts/**',
            'thirdparty/**',
            '/img/**/{*.svg}',
            '!**/*.md'
        ], {cwd:config.src, base:"./src"})

        .pipe(plumber())
        .pipe(changed(dest)) // Ignore unchanged files
        .pipe(gulp.dest(dest));
});
