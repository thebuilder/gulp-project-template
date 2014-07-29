var gulp       = require('gulp');

/**
 * Minify images and copy to dist directory.
 */
gulp.task('images', function() {
    var changed    = require('gulp-changed');
    var imagemin   = require('gulp-imagemin');
    var plumber   = require('gulp-plumber');
    var config     = require('../config');

	var dest = config.dist + config.imgDir;

	return gulp.src(config.src + config.imgDir + '**/{*.png,*.jpg,*.gif,*.svg}')
        .pipe(plumber())
		.pipe(changed(dest)) // Ignore unchanged files
		.pipe(imagemin()) // Optimize
        .pipe(gulp.dest(dest));
});
