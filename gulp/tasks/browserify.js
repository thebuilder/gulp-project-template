var gulp = require('gulp');
var gulpif = require('gulp-if');
var gutil = require('gulp-util');
var mold = require('mold-source-map');
var source = require('vinyl-source-stream');
var path = require("path");
var glob = require('glob');
var filter = require('gulp-filter');
var es = require('event-stream');

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

gulp.task('testify', ['build'], function () {
    compileTestBundle(false);
});

gulp.task('testify-watch', ['build'], function () {
    fileChangeWatcher();
    compileTestBundle(true);
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

var testBundler;
/**
 * Compile and browserify the test files into a bundle
 * @param watch
 **/
function compileTestBundle(watch) {
    if (watch) {
        testBundler = require('watchify')(getTestFiles());
    } else {
        testBundler = require('browserify')(getTestFiles());
    }

    //Wrap the bundle method in a function, so it can be called by watchify
    var rebundle = function (files) {
        logFiles(files, "Testify:");

        testBundler.bundle({debug: true})
            .on('error', function (error) {
                handleErrors(error); //Break the pipe by placing error handler outside
            })
            .pipe(source('test.bundle.js'))
            .pipe(gulp.dest(config.test.root))
    };

    if (watch) testBundler.on('update', rebundle);
    return rebundle();
}

function fileChangeWatcher() {
    var watch = require('gulp-watch');

    //Watch for new spec.js files, and sync the testify run. Otherwise new files will not be added.
    watch({glob: config.src + '**/*.spec.js', name: 'TestJS', emitOnGlob: false, silent:true}, function (files) {
        var firstSync;
        //Filter out files that have changed. Only want added or deleted files.
        files.pipe(filter(function (file) {
            return file.event === 'added' || file.event === 'deleted' || file.event == 'renamed';
        }))
            .pipe(es.map(function (data, cb) { //turn this async function into a stream
                if (!firstSync) {
                    firstSync = true;
                    //Trigger the syncTestFiles if files have changed
                    testBundler.files = getTestFiles();
                    testBundler.emit('update');
                }
                cb(null, data);
            }));
    }).on("error", function(e) {});
}

function getTestFiles() {
    var testFiles = glob.sync("./" + config.src + config.jsDir + '**/*.spec.js');
    //Glob all spec files. Returns array with all the files.
    for (var i = 0; i < testFiles.length; i++) {
        testFiles[i] = path.resolve(testFiles[i]);
    }
    return testFiles;
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