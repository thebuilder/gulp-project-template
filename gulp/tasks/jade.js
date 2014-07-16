var gulp         = require('gulp');
var gulpif       = require('gulp-if');
var data         = require('gulp-data');
var jade         = require('gulp-jade');
var changed      = require('gulp-changed');
var plumber      = require('gulp-plumber');

var handleErrors = require('../util/handleErrors');
var readJson     = require("../util/readJsonFiles");
var config       = require('../config');

gulp.task('jade', function() {
    return gulp.src(config.src + config.viewsDir + config.jadeFiles)
        .pipe(plumber({errorHandler:handleErrors}))
        .pipe(gulpif(config.onlyCompileChangedPages,
            changed(config.dist, { extension: '.html' }) // Ignore unchanged files
        ))
        .pipe(data(getData))
        .pipe(jade({pretty: true}))
        .pipe(gulp.dest(config.dist));
});

function getData(file, cb) {
    //Read .json data from the jadeData directory, and make it accessible to Jade.
    cb(readJson(config.src + config.viewsDir + config.jadeData))
}