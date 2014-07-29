var gulp         = require('gulp');

var readJson     = require("../util/readJsonFiles");
var config       = require('../config');

gulp.task('jade', function() {
    //Require in task, to improve startup time
    var data         = require('gulp-data');
    var jade         = require('gulp-jade');
    var plumber      = require('gulp-plumber');

    var handleErrors = require('../util/handleErrors');

    return gulp.src(config.src + config.viewsDir + config.jadeFiles)
        .pipe(plumber({errorHandler:handleErrors}))
        .pipe(data(getData))
        .pipe(jade({pretty: true}))
        .pipe(gulp.dest(config.dist));
});

function getData(file, cb) {
    //Read .json data from the jadeData directory, and make it accessible to Jade.
    cb(readJson(config.src + config.jadeData))
}