var gulp        = require('gulp');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');
var gutil       = require('gulp-util');
var rename      = require('gulp-rename');
var minifyCSS   = require('gulp-minify-css');
var files       = require('bower-files')();
var es          = require("event-stream");

var plumber     = require('gulp-plumber');
var config      = require('../config');

gulp.task('bower', function () {
    var streams = [];

    function logFiles(groupFiles) {
        var path;
        //Log out all the files being found in bower
        for (var i = 0; i < groupFiles.length; i++) {
            path = groupFiles[i];
            path = path.substring(path.indexOf("bower_components/"));
            gutil.log("Adding: " + gutil.colors.green(path));
        }
    }
    if (files["js"]) {
        //Concat all the Bower JS libs
        gutil.log("Package JS");
        logFiles(files["js"]);
        streams.push(
            gulp.src(files["js"])
                .pipe(plumber())
                .pipe(concat('vendor.min.js'))
                .pipe(uglify({mangle: false}))
                .pipe(rename(function (path) {
                    path.dirname = "js";
                    gutil.log("Output: " + gutil.colors.yellow(path.dirname + "/" + path.basename + path.extname));
                }))
        );
    }

    if (files["css"]) {
        //Concat all the Bower CSS libs
        gutil.log("Package CSS");
        logFiles(files["css"]);
        streams.push(
            gulp.src(files.css)
                .pipe(plumber())
                .pipe(concat('vendor.min.css'))
                .pipe(minifyCSS({keepBreaks: true}))
                .pipe(rename(function (path) {
                    path.dirname = "css";
                    gutil.log("Output: " + gutil.colors.yellow(path.dirname + "/" + path.basename + path.extname));
                }))
        );
    }

    //Output the vendor files to the dist directory.
    return es.merge.apply(this, streams)
        .pipe(plumber())
        .pipe(gulp.dest(config.dist));
});