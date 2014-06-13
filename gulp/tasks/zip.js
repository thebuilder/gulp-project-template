var gulp = require("gulp");
var gutil = require('gulp-util');
var zip = require("gulp-zip");

var pck = require("../../package.json");
var config = require("../config");

gulp.task('zip', ["build"], function () {
    var version = pck.version.split(".").join("_");
    var zipFile = pck.name + "_" + version + ".zip";
    gutil.log("Packing zip file:", gutil.colors.yellow(config.releases + "/" + zipFile));

    return gulp.src(config.dist + "/**/*.*")
        .pipe(zip(zipFile))
        .pipe(gulp.dest(config.releases));
});