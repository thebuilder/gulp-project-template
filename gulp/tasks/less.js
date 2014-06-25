var gulp         = require('gulp');
var less         = require('gulp-less');
var recess         = require('gulp-recess');
var autoprefixer = require('gulp-autoprefixer');
var gulpif       = require('gulp-if');
var plumber      = require('gulp-plumber');
var minifyCSS    = require('gulp-minify-css');

var config       = require('../config');
var handleErrors = require('../util/handleErrors');

gulp.task('less', function () {
    return gulp.src(config.src + '/' + config.lessDir +'/' + config.mainLess)
        .pipe(plumber({errorHandler:handleErrors}))
        //Lint the LESS file with recess before compiling it
        .pipe(recess({
            strictPropertyOrder:false,   // Complains if not strict property order
            noIDs: true,                 // Doesn't complain about using IDs in your stylesheets
            noJSPrefix: true,            // Doesn't complain about styling .js- prefixed classnames
            noOverqualifying: true,      // Doesn't complain about overqualified selectors (ie: div#foo.bar)
            noUnderscores: true,         // Doesn't complain about using underscores in your class names
            noUniversalSelectors: true,  // Doesn't complain about using the universal * selector
            zeroUnits: true              // Doesn't complain if you add units to values of 0
        }))
        .pipe(less({
            sourceMap:!config.isReleaseBuild
        }))
        //Auto add vendor prefixes. See https://www.npmjs.org/package/gulp-autoprefixer for details on defining browser support
        .pipe(autoprefixer({
            map: !config.isReleaseBuild,
            from: config.mainLess,
            to: "app.css"
        }))
        .pipe(gulpif(config.isReleaseBuild, minifyCSS({keepBreaks:true})))
        .pipe(gulp.dest(config.dist + '/css'))
});
