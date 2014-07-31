var gulp = require('gulp');
var gulpif = require('gulp-if');
var gutil = require('gulp-util');
var mold = require('mold-source-map');
var source = require('vinyl-source-stream');
var path = require("path");

var handleErrors = require('../util/handleErrors');
var config = require('../config');

/**
 * Browserify should always depend on lint, to ensure JS is looking good.
 */
gulp.task('browserify', function () {
    compile(false);
});

gulp.task('watchify', ['build'], function () {
    compile(true);
});


/**
 * Compile and browserify the app main JS file
 * @param watch
 */
function compile(watch) {
    var bundler;
    if (watch) {
        bundler = require('watchify')();
    } else {
        bundler = require('browserify')();
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
        logFiles(files, "Watchify:");
        bundler.bundle({debug: !config.isReleaseBuild})
            .on('error', function(error) {
                handleErrors(error); //Break the pipe by placing error handler outside
            })
            .pipe(gulpif(!config.isReleaseBuild, mold.transformSourcesRelativeTo(config.src)))
            .pipe(source(config.mainJs))
            .pipe(gulp.dest(config.dist + "js"));
    };

    if (watch) bundler.on('update', rebundle);
    return rebundle();
}



/**
 * Console log all files in the array.
 * @param files {Array}
 * @param label {String}
 */
function logFiles(files, label) {
    if (files) {
        for (var i = 0; i < files.length; i++) {
            gutil.log((label  ? label + " ": "") + gutil.colors.magenta(path.relative(config.src, files[i])));
        }
    }
}