var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('browserify');
var watchify = require('watchify');
var mold = require('mold-source-map');
var path = require("path");
var source = require('vinyl-source-stream');

var handleErrors = require('../util/handleErrors');
var config = require('../config');

/**
 * Browserify should always depend on lint, to ensure JS is looking good.
 */
gulp.task('browserify', function () {
    compile(false);
});

gulp.task('watchify', function () {
    compile(true);
});

function compile(watch) {
    var bundler;
    if (watch) {
        bundler = watchify();
    } else {
        bundler = browserify();
    }

    bundler.add("./" + config.src + config.jsDir + config.mainJs);

    if (config.isReleaseBuild) {
        //Strip debug statements
        bundler.transform("stripify").on('error', handleErrors);

        //Uglify when compiling for release
        bundler.transform({
            global: true,
            mangle: false,
            exts: [".js"], //Only uglify .js files. Would break if .html or .json are required.
            ignore: []
        }, 'uglifyify').on('error', handleErrors);
    }

    //Wrap the bundle method in a function, so it can be called by watchify
    var rebundle = function (files) {
        if (files) {
            for (var i = 0; i < files.length; i++) {
                gutil.log("Watchify: " + gutil.colors.yellow(path.relative(config.src, files[i])));
            }
        }
        bundler.bundle({debug: !config.isReleaseBuild})
            .on('error', handleErrors)
            .pipe(mold.transformSourcesRelativeTo(config.dist)).on('error', handleErrors)
            .pipe(source(config.mainJs))
            .pipe(gulp.dest(config.dist + config.jsDir));
    };

    if (watch) bundler.on('update', rebundle);
    return rebundle();
}