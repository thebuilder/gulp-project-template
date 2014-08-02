var gulp = require('gulp');
var path = require('path');
var config = require('../config');
var handleErrors = require('../util/handleErrors');

gulp.task('test', ['testify'], function(done) {
    var karma = require('karma').server;

    var opts = {
        configFile: path.resolve('karma.conf.js'),
        singleRun: true
    };

    //Test more browsers in CI env.
    if (process.env.CI) opts.browsers = ["Chrome", "Firefox", "PhantomJS"];

    karma.start(opts, function (exitCode) {
        if (exitCode != 0) {
            //Stop the process
            process.exit(exitCode);
        } else {
            done();
        }
    });
});

gulp.task('test-watch', ['testify-watch'], function(done) {
    var karma = require('karma').server;

    karma.start({
        configFile: path.resolve('karma.conf.js'),
        singleRun: false,
        autoWatch: true
    }, function (exitCode) {
        process.exit(exitCode);
    });
    done();
});

// Run e2e tests using protractor.
// Make sure server task is running.
gulp.task('protractor', ['serve', 'webdriver:update'], function() {
    var protractor = require('gulp-protractor').protractor;

    return gulp.src(config.test.e2e)
        .pipe(protractor({
            configFile: 'protractor.conf.js'
        }))
        .on('error', handleErrors);
});

// Update/install webdriver.
gulp.task('webdriver:update', require('gulp-protractor').webdriver_update);
