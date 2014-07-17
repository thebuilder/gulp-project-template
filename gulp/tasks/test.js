var gulp = require('gulp');
var path = require('path');

var karma = require('karma').server;

gulp.task('test', ['testify'], function() {
    karma.start({
        configFile: path.resolve('karma.conf.js'),
        singleRun: true
    }, function (exitCode) {
        process.exit(exitCode);
    });
});

gulp.task('test-watch', ['testify-watch'], function() {
    karma.start({
        configFile: path.resolve('karma.conf.js'),
        singleRun: false,
        autoWatch: true
    }, function (exitCode) {
        process.exit(exitCode);
    });
});