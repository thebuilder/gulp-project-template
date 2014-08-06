var gulp = require('gulp');
var gutil = require('gulp-util');
var path = require("path");

var handleErrors = require('../util/handleErrors');
var config = require('../config');

gulp.task('browserify', function () {
    return compile(false);
});

gulp.task('watchify', ['build'], function () {
    return compile(true);
});


/**
 * Compile and browserify the app main JS file
 * @param watch
 */
function compile(watch) {
    var watchify = require('watchify');
    var browserify = require('browserify');
    var mold = require('mold-source-map');
    var source = require('vinyl-source-stream');
    var extend = require("extend");
    var stripDebug = require('gulp-strip-debug');
    var streamify = require('gulp-streamify');

    var opts = {debug:!config.isReleaseBuild, extensions: [".js"]};
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
        bundler.transform({
            exts: ['.js']
        }, 'browserify-ngannotate');

        //Uglify when compiling for release
        bundler.transform({
            global: true,
            mangle: false,
            exts: [".js"], //Only uglify .js files. Would break if .html or .json are required.
            ignore: []
        }, 'uglifyify');
    }

    //Wrap the bundle method in a function, so it can be called by watchify
    function rebundle() {
        return bundler.bundle(opts)
            .on('error', function(error) {
                handleErrors(error); //Break the pipe by placing error handler outside
            })
            .pipe(!config.isReleaseBuild ? mold.transformSources(mapSources) : gutil.noop())
            .pipe(source(config.js.name))
            .pipe(config.isReleaseBuild ? streamify(stripDebug()) : gutil.noop())
            .pipe(gulp.dest(config.dist + config.js.dir));
    }

    if (watch) {
        bundler.on('update', logFiles);
        bundler.on('update', rebundle);
    }
    return rebundle();
}


/**
 * Transform the paths in the sourcemap, so they become relative, and point to the virtual "source" directory.
 * @param file {string}
 * @return {string}
 */
function mapSources(file) {
    if (!file) return "";
    if (file.indexOf("node_modules") > -1) {
        return "../source/" + path.relative(path.resolve("."), file);
    } else {
        return "../source/" + config.js.dir + "/" + path.relative(path.resolve(config.src + config.js.dir), file);
    }
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