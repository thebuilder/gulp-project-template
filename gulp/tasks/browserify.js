var gulp         = require('gulp');
var browserify   = require('browserify');
var minifyify    = require('minifyify');
var path         = require('path');
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
    b.add("./" + config.src + '/' + config.jsDir + '/' + config.mainJs);
    if (config.isReleaseBuild) {
        //Minify and create source maps bundle if creating release build
        b.plugin('minifyify', {
            map: 'bundle.map.json',
            output:config.dist + '/' + config.jsDir + '/bundle.map.json',
            compressPath: function (p) {
                //Relative path to the src files. Remove to use absolute paths
                return path.relative(config.dist, p);
            }
        });
    }

    return b.bundle({debug: !config.isReleaseBuild})
        .on('error', handleErrors)
        .pipe(plumber())
        .pipe(source(config.mainJs))
        .pipe(gulp.dest(config.dist + '/'+ config.jsDir + '/'));
});
