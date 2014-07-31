var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var path = require("path");

var handleErrors = require('../util/handleErrors');
var config = require('../config');


gulp.task('testify', ['build'], function () {
    compileTestBundle(false);
});

gulp.task('testify-watch', ['build'], function () {
    fileChangeWatcher();
    compileTestBundle(true);
});

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
    var filter = require('gulp-filter');
    var glob = require('glob');
    var es = require('event-stream');

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