var gulp         = require('gulp');
var plumber         = require('gulp-plumber');
var browserify   = require('browserify');
var watchify     = require('watchify');
var mold         = require('mold-source-map');
//var exorcist     = require('exorcist');
var source       = require('vinyl-source-stream');
var handleErrors = require('../util/handleErrors');
var config       = require('../config');

/**
 * Browserify should always depend on lint, to ensure JS is looking good.
 */
gulp.task('browserify', function(){
    compile(false);
});

gulp.task('watchify', function(){
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
    var rebundle = function () {
       bundler.bundle({debug: !config.isReleaseBuild})
            .on('error', handleErrors)
            .pipe(plumber())
            .pipe(mold.transformSourcesRelativeTo(config.dist))
            //.pipe(exorcist(config.dist + "js/script.min.js.map"))
            .pipe(source(config.mainJs))
            .pipe(gulp.dest(config.dist + config.jsDir));
    };

    if (watch) bundler.on('update', rebundle);
    else return rebundle();
}