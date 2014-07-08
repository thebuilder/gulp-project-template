var gulp    = require('gulp');
var open    = require("gulp-open");
var config  = require('../config');

gulp.task('open', function() {
    if (!config.server.openBrowser) return null;

	var options = {
		url: "http://localhost:" + config.server.port,
		app: config.server.browser
	};

	return gulp.src(config.dist + config.server.indexFile)
        .pipe(open("", options));
});
