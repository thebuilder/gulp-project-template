var gulp         = require('gulp');
var browserify   = require('browserify');
var plumber      = require('gulp-plumber');
var source       = require('vinyl-source-stream');
var handleErrors = require('../util/handleErrors');
var config       = require('../config');

/**
 * Browserify should always depend on lint, to ensure JS is looking good.
 */
gulp.task('browserify', ['lint'], function(){
    /**
     * @type {Browserify}
     */
    var b = browserify();
    //Add the main js file
    b.add("./" + config.src + config.jsDir + config.mainJs);

    if (config.isReleaseBuild) {
        //Uglify when compiling for release
        b.transform({
            global: true,
            mangle: false,
            exts: [".js"], //Only uglify .js files. Would break if .html or .json are required.
            ignore: []
        }, 'uglifyify');
    }

    //After transforms have been applied, bundle it all up and export
    return b.bundle({debug: !config.isReleaseBuild})
        .on('error', handleErrors)
        .pipe(plumber())
        .pipe(source(config.mainJs))
        .pipe(gulp.dest(config.dist + config.jsDir));
});
