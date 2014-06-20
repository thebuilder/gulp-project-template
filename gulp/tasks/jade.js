var gulp         = require('gulp');
var jade         = require('gulp-jade');
var changed      = require('gulp-changed');
var plumber      = require('gulp-plumber');
var config       = require('../config');
var readJson     = require("../util/readJsonFiles");

gulp.task('jade', function() {
    //Read .json data from the jadeLocals directory, and make it accessible to Jade.
    var locals = config.jadeLocals ? readJson(config.src + '/' + config.jadeLocals) : {};

    return gulp.src(config.src + '/' + config.jadeFiles)
        .pipe(plumber())
        .pipe(changed(config.dist, { extension: '.html' })) // Ignore unchanged files
        .pipe(jade({pretty: true, locals:locals}))
        .pipe(gulp.dest(config.dist));
});
