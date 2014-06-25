var gulp         = require('gulp');
var gulpif       = require('gulp-if');
var jade         = require('gulp-jade');
var changed      = require('gulp-changed');
var plumber      = require('gulp-plumber');

var readJson     = require("../util/readJsonFiles");
var config       = require('../config');

gulp.task('jade', function() {
    //Read .json data from the jadeLocals directory, and make it accessible to Jade.
    var locals = config.jadeLocals ? readJson(config.src + config.viewsDir + config.jadeLocals) : {};

    return gulp.src(config.src + config.viewsDir + config.jadeFiles)
        .pipe(plumber())
        .pipe(gulpif(config.onlyCompiledChangedPages, changed(config.dist, { extension: '.html' }))) // Ignore unchanged files
        .pipe(jade({pretty: true, locals:locals}))
        .pipe(gulp.dest(config.dist));
});
