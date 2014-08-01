var gulp         = require('gulp');

var readJson     = require("../util/readJsonFiles");
var config       = require('../config');

gulp.task('jade', function() {
    //Require in task, to improve startup time
    var data         = require('gulp-data');
    var gulpif       = require('gulp-if');
    var jade         = require('gulp-jade');
    var plumber      = require('gulp-plumber');
    var reload       = require('gulp-inject-reload');

    var ip = require('../util/ip');
    var handleErrors = require('../util/handleErrors');

    return gulp.src(config.jade.src)
        .pipe(plumber({errorHandler:handleErrors}))
        .pipe(data(getData))
        .pipe(jade({pretty: true}))

        //Include LiveReload script tag if creating a debug build.
        .pipe(gulpif(!config.isReleaseBuild, reload({
                host: 'http://' + ip() //Uses the local ip address of this machine, allowing you to use LiveReload on other devices connected to the network. Niceness!
            }
        )))
        .pipe(gulp.dest(config.dist));
});

function getData(file, cb) {
    //Read .json data from the jadeData directory, and make it accessible to Jade.
    cb(readJson(config.jade.data))
}