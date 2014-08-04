var gulp = require('gulp');

gulp.task('open', ['serve'], function() {
    var open    = require("gulp-open");
    var config  = require('../config');

	var options = {
		url: "http://localhost:" + config.server.port,
		app: config.server.browser
	};

	return gulp.src(config.dist + config.server.indexFile)
        .pipe(open("", options));
});
