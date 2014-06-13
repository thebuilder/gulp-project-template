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
require('./gulp');

//Build and start watching for changes
gulp.task('default', ['build', 'watch', 'serve', 'open']);

//All build tasks
gulp.task('build', ['browserify', 'jade', 'less', 'bower', 'images', 'assets']);
