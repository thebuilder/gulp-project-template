var gulp    = require('gulp');
var open    = require("gulp-open");
var config  = require('../config');

gulp.task('open', ['build'], function() {
    if (!config.server.openBrowser) return null;

	var options = {
		url: "http://localhost:" + config.server.port,
		app: config.server.browser
	};

	return gulp.src(config.server.root + "/index.html").pipe(open("", options));
});
