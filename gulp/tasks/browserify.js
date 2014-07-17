var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('browserify');
var watchify = require('watchify');
var mold = require('mold-source-map');
var source = require('vinyl-source-stream');
var path = require("path");
var glob = require('glob');

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

gulp.task('testify', function () {
    compileTestBundle(false);
});

gulp.task('testify-watch', function () {
    compileTestBundle(true);
});


/**
 * Compile and browserify the app main JS file
 * @param watch
 */
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
        logFiles(files, "Watchify:");

        bundler.bundle({debug: !config.isReleaseBuild})
            .on('error', function(error) {
                handleErrors(error); //Break the pipe by placing error handler outside
            })
            .pipe(mold.transformSourcesRelativeTo(config.dist))
            .pipe(source(config.mainJs))
            .pipe(gulp.dest(config.dist + config.jsDir));
    };

    if (watch) bundler.on('update', rebundle);
    return rebundle();
}

/**
 * Compile and browserify the test files into a bundle
 * @param watch
 **/

function compileTestBundle(watch) {
    //Glob all spec files. Returns array with all the files.
    var testFiles = glob.sync("./" + config.src + config.jsDir + '**/*.spec.js');

    var bundler;
    if (watch) {
        bundler = watchify(testFiles);
    } else {
        bundler = browserify(testFiles);
    }

    //Wrap the bundle method in a function, so it can be called by watchify
    var rebundle = function (files) {
        logFiles(files, "Testify:");

        bundler.bundle({debug: true})
            .on('error', function (error) {
                handleErrors(error); //Break the pipe by placing error handler outside
            })
            .pipe(mold.transformSourcesRelativeTo(config.test))
            .pipe(source('test.bundle.js'))
            .pipe(gulp.dest(config.test));
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