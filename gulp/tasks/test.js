var gulp = require('gulp');
var path = require('path');
var config = require('../config');
var handleErrors = require('../util/handleErrors');

gulp.task('test', ['testify'], function(done) {
    var karma = require('karma').server;

    //Set a timeout to ensure that the file is written.
    setTimeout(function() {
        karma.start({
            configFile: path.resolve('karma.conf.js'),
            singleRun: true
        }, function (exitCode) {
            if (exitCode != 0) {
                //Stop the process
                process.exit(exitCode);
            } else {
                done();
            }
        });
    }, 2000);
});

gulp.task('test-watch', ['testify-watch'], function(done) {
    var karma = require('karma').server;
    setTimeout(function() {
        karma.start({
            configFile: path.resolve('karma.conf.js'),
            singleRun: false,
            autoWatch: true
        }, function (exitCode) {
            process.exit(exitCode);
        });
        done();
    }, 500);
});

// Run e2e tests using protractor.
// Make sure server task is running.
gulp.task('protractor', ['build', 'webdriver:update'], function() {
    var protractor = require('gulp-protractor').protractor;

    return gulp.src(config.test.e2e)
        .pipe(protractor({
            configFile: 'protractor.conf.js'
        }))
        .on('error', handleErrors);
});

// Update/install webdriver.
gulp.task('webdriver:update', require('gulp-protractor').webdriver_update);
