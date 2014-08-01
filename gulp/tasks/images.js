var gulp       = require('gulp');

/**
 * Minify images and copy to dist directory.
 */
gulp.task('images', function() {
    var changed    = require('gulp-changed');
    var imagemin   = require('gulp-imagemin');
    var plumber   = require('gulp-plumber');
    var config     = require('../config');

	var dest = config.dist + config.img.dir;

	return gulp.src(config.img.src)
        .pipe(plumber())
		.pipe(changed(dest)) // Ignore unchanged files
		.pipe(imagemin()) // Optimize
        .pipe(gulp.dest(dest));
});
