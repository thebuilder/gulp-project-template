var gulp = require('gulp');

gulp.task('watch', ["watchify"], function () {
    var watch = require('gulp-watch');
    var config = require('../config');

    //LESS
    watch({glob: config.less.src, name: 'LESS', emitOnGlob: false}, ['less'])
        .on("error", function(e) {});

    //IMAGES
    watch({glob: config.img.src, name: 'Images', emitOnGlob: false}, ['images'])
        .on("error", function(e) {});

    //BOWER
    watch({glob: 'bower_components/**/{*.js,*.css}', name: 'Bower', emitOnGlob: false}, ['bower'])
        .on("error", function(e) {});

    //JADE
    watch({glob: [config.src + 'data/**/*.json', config.src + '**/*.jade', '!' + config.src + '**/{*.tpl.jade, *.test.jade}'], name: 'JADE', emitOnGlob: false}, ['jade'])
        .on("error", function(e) {});

    //OTHER ASSETS
    watch({glob:config.assets.src, name:"Assets", emitOnGlob:false}, ['assets'])
        .on("error", function(e) {});

    //LIVE RELOAD - Watch the build directories for changes, and execute LiveReload.
    var livereload = require('gulp-livereload');
    var cache = require('gulp-cached');
    var filter = require('gulp-filter');

    var watchFilter = filter(['*.js', '*.html', '*.css']);
    watch({glob: config.dist + '**/*.*', name: 'LiveReload', emitOnGlob: false})
        .on("error", function(e) {})
        .pipe(watchFilter)
        .pipe(cache('dist')) //Only reload files with changed content. LiveReload could choke on to many updated .html files otherwise.
        .pipe(watchFilter.restore()) //Add back filtered files like images.
        .pipe(livereload()); //Execute a LiveReload on changed files in build directory
});