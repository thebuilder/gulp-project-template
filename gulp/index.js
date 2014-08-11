var fs = require('fs');
var tasks = fs.readdirSync('./gulp/tasks/');

/**
 * Include all the tasks in the tasks directory
 */
tasks.forEach(function(task) {
	require('./tasks/' + task);
});