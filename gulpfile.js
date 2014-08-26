/**
	gulpfile.js
	===========
	Rather than manage one giant configuration file responsible
	for creating multiple tasks, each task has been broken out into
	its own file in gulp/tasks. Any file in that folder gets automatically
	required by the loop in ./gulp/index.js (required below).

	To add a new task, simply add a new task file to gulp/tasks.
*/

var gulp = require('gulp');
var sequence = require('run-sequence');
var config = require("./gulp/config");

//Require the project gulp directory
require('./gulp');

//Build and start watching for changes
gulp.task('default', function(done) {
    sequence('build', 'watch', 'watchify', 'karma-watch', 'serve', 'open', done);
});

//All build tasks
gulp.task('build', ['browserify', 'jade', 'less', 'bower', 'images', 'assets']);

//Run tests
gulp.task('test', function(done) {
    sequence('karma', 'protractor', done)
});

//Create a release build
gulp.task('release', function(done) {
    config.isReleaseBuild = true;
    sequence('build', done);
});

//Create a release build, zip and upload it
gulp.task('deploy', function(done) {
    sequence('release', 'test', 'zip', 'ftp', done);
});