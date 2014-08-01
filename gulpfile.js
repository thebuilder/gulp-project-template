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

//Require the project gulp directory
require('./gulp');

//Build and start watching for changes
gulp.task('default', ['build', 'watch', 'test-watch', 'serve']);

//All build tasks
gulp.task('build', ['browserify', 'jade', 'less', 'bower', 'images', 'assets']);

//Create a release build
gulp.task('release', function() {
    var config = require("./gulp/config");
    config.isReleaseBuild = true;

    //Run build task
    gulp.start('build');
});

//Create a release build, zip and upload it
gulp.task('deploy', ['release', 'test', 'zip', 'ftp']);