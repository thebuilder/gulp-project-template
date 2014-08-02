var gulp = require('gulp');
var gulpif = require('gulp-if');
var gutil = require('gulp-util');
var mold = require('mold-source-map');
var source = require('vinyl-source-stream');
var path = require("path");
var extend = require("extend");

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
    var watchify = require('watchify');
    var browserify = require('browserify');

    var opts = {debug:!config.isReleaseBuild};
    var bundler;
    if (watch) {
        //bundler = watchify(browserify(extend(opts, watchify.args)));
        bundler = watchify();
    } else {
        bundler = browserify();
    }

    //bundler.add(path.resolve(config.js.src));
    bundler.add("./" + config.js.src);

    if (config.isReleaseBuild) {
        //Uglify when compiling for release
        bundler.transform({
            global: true,
            mangle: false,
            exts: [".js"], //Only uglify .js files. Would break if .html or .json are required.
            ignore: []
        }, 'uglifyify');

        bundler.transform({
            exts: [".js"]
        }, 'browserify-ngannotate');
    }

    //Wrap the bundle method in a function, so it can be called by watchify
    function rebundle() {
        return bundler.bundle(opts)
            .on('error', function(error) {
                handleErrors(error); //Break the pipe by placing error handler outside
            })
            .pipe(gulpif(!config.isReleaseBuild, mold.transformSourcesRelativeTo(config.src)))
            .pipe(source(config.js.name))
            .pipe(gulp.dest(config.dist + config.js.dir));
    }

    if (watch) {
        bundler.on('update', logFiles);
        bundler.on('update', rebundle);
    }
    return rebundle();
}



/**
 * Console log all files in the array.
 * @param files {Array}
 */
function logFiles(files) {
    if (files) {
        for (var i = 0; i < files.length; i++) {
            gutil.log("Watchify: " + gutil.colors.magenta(path.relative(config.src, files[i])));
        }
    }
}