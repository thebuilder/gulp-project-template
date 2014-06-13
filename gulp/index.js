var fs = require('fs');
var onlyScripts = require('./util/scriptFilter');
var tasks = fs.readdirSync('./gulp/tasks/').filter(onlyScripts);

/**
 * Include all the tasks in the tasks directory
 */
tasks.forEach(function(task) {
	require('./tasks/' + task);
});