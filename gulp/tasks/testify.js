var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var path = require("path");
var glob = require('glob');
var extend = require("extend");

var handleErrors = require('../util/handleErrors');
var config = require('../config');

var testBundler;

gulp.task('testify', function () {
    return compileTestBundle(false);
});

gulp.task('testify-watch', ['build'], function () {
    fileChangeWatcher();
    return compileTestBundle(true);
});


/**
 * Compile and browserify the test files into a bundle
 * @param watch
 **/
function compileTestBundle(watch) {
    var watchify = require('watchify');
    var browserify = require('browserify');

    var opts = {debug:true, extensions: [".js"]};
    if (watch) {
//        testBundler = watchify(browserify(getTestFiles(), extend(opts, watchify.args)));
        testBundler = watchify(getTestFiles());
    } else {
        testBundler = browserify(getTestFiles());
    }

    //Wrap the bundle method in a function, so it can be called by watchify
    function rebundle () {
        return testBundler.bundle(opts)
            .on('error', function (error) {
                handleErrors(error); //Break the pipe by placing error handler outside
            })
            .pipe(source('test.bundle.js'))
            .pipe(gulp.dest(config.test.root))
    }

    if (watch){
        testBundler.on('update', logFiles);
        testBundler.on('update', rebundle);
    }
    return rebundle();
}

function fileChangeWatcher() {
    var watch = require('gulp-watch');
    var filter = require('gulp-filter');
    var es = require('event-stream');

    //Watch for new spec.js files, and sync the testify run. Otherwise new files will not be added.
    watch({glob: config.test.spec, name: 'TestJS', emitOnGlob: false, silent:true}, function (files) {
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
    var testFiles = glob.sync("./" + config.test.spec);
    //Glob all spec files. Returns array with all the files.
    for (var i = 0; i < testFiles.length; i++) {
        testFiles[i] = path.resolve(testFiles[i]);
    }
    return testFiles;
}

/**
 * Console log all files in the array.
 * @param files {Array}
 */
function logFiles(files) {
    if (files) {
        for (var i = 0; i < files.length; i++) {
            gutil.log(("Testify: " + gutil.colors.magenta(path.relative(config.src, files[i]))));
        }
    }
}