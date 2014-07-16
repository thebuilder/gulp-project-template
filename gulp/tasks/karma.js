var gulp = require('gulp');
var path = require('path');

var karma = require('karma').server;

gulp.task('test', ['browserify-test'], function() {
    karma.start({
        configFile: path.resolve('karma.conf.js'),
        singleRun: true
    }, function (exitCode) {
        process.exit(exitCode);
    });
});

gulp.task('test-watch', ['watchify-test'], function() {
    karma.start({
        configFile: path.resolve('karma.conf.js'),
        singleRun: false,
        autoWatch: true
    }, function (exitCode) {
        process.exit(exitCode);
    });
});