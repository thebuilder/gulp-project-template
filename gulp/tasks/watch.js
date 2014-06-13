var gulp        = require('gulp');
var livereload  = require('gulp-livereload');
var watch       = require('gulp-watch');

var config = require('../config');

gulp.task('watch', function () {
	watch({glob:config.src + '/' + config.jsDir + '/**', name:"JS", emitOnGlob:false}, ['browserify']);
	watch({glob:config.src + '/'+ config.lessDir + '/**', name:"LESS", emitOnGlob:false}, ['less']);
	watch({glob:config.src + '/'+ config.imgDir + '/**', name:"Images", emitOnGlob:false}, ['images']);
    watch({glob:config.src + '/views/**', name:"JADE", emitOnGlob:false}, ['jade']);
	watch({glob:'bower_components/**/{*.js,*.css}', name:"Bower", emitOnGlob:false}, ['bower']);
	watch({glob:[
        config.src + '/fonts/**',
        config.src + '/thirdparty/**'
    ], name:"Assets", emitOnGlob:false}, ['assets']);

    //Watch the build directories for changes, and execute LiveReload.
	watch({glob:[config.dist + '/**'], name:"LiveReload", emitOnGlob:false})
        .pipe(livereload()); //Execute a LiveReload on changed files

});
