var gulp = require('gulp');
var path = require('path');
var config = require('../config');

gulp.task('karma', ['testify', 'coverage'], function(done) {
    var karma = require('karma').server;

    var opts = {
        configFile: path.resolve('karma.conf.js'),
        singleRun: true
    };

    //Test more browsers in release build.
    if (config.isReleaseBuild) {
        opts.browsers = ["Chrome", "Firefox", "PhantomJS"];
    }

    karma.start(opts, function (exitCode) {
        if (exitCode != 0) {
            //Stop the process
            process.exit(exitCode);
        } else {
            done();
        }
    });
});

gulp.task('karma-watch', ['testify-watch', 'coverage-watch'], function(done) {
    var karma = require('karma').server;

    var opts = {
        configFile: path.resolve('karma.conf.js'),
        singleRun: false,
        autoWatch: true
    };

    karma.start(opts, function (exitCode) {
        process.exit(exitCode);
    });
    done();
});