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

    var path;
    for (var group in files) {
        var groupFiles = files[group];
        gutil.log("Package " + group.toUpperCase());

        //Log out all the files being found in bower
        for (var i = 0; i < groupFiles.length; i++) {
            path = groupFiles[i];
            path = path.substring(path.indexOf("bower_components/"));
            gutil.log("Adding: " + gutil.colors.green(path));
        }

        switch (group) {
            case "js":
                //Concat all the Bower JS libs
                streams.push(
                    gulp.src(files.js)
                        .pipe(plumber())
                        .pipe(concat('vendor.min.js'))
                        .pipe(uglify())
                        .pipe(rename(function(path) {
                            path.dirname = "js";
                            gutil.log("Output: " + gutil.colors.yellow(path.dirname + "/" + path.basename + path.extname));
                        }))
                );
                break;
            case "css":
                //Concat all the Bower CSS libs
                streams.push(
                    gulp.src(files.css)
                        .pipe(plumber())
                        .pipe(concat('vendor.min.css'))
                        .pipe(minifyCSS({keepBreaks:true}))
                        .pipe(rename(function(path) {
                            path.dirname = "css";
                            gutil.log("Output: " + gutil.colors.yellow(path.dirname + "/" + path.basename + path.extname));
                        }))
                );
                break;
        }
    }

    //Output the vendor files to the dist directory.
    return es.merge.apply(this, streams)
        .pipe(plumber())
        .pipe(gulp.dest(config.dist));
});