var gulp        = require('gulp');
var livereload  = require('gulp-livereload');
var watch       = require('gulp-watch');

var config = require('../config');

gulp.task('watch', function () {
	watch({glob:config.src + '/' + config.jsDir + '/**', name:"JS", emitOnGlob:false}, ['browserify']);
	watch({glob:config.src + '/'+ config.lessDir + '/**', name:"LESS", emitOnGlob:false}, ['less']);
	watch({glob:config.src + '/'+ config.imgDir + '/**', name:"Images", emitOnGlob:false}, ['images']);
	watch({glob:'bower_components/**/{*.js,*.css}', name:"Bower", emitOnGlob:false}, ['bower']);

	//JADE
    watch({glob:[config.src + '/views/**', "!" + config.src + '/' + config.jadeLocals + "*.json"], name:"JADE", emitOnGlob:false}, ['jade']);
    watch({glob:config.src + '/' + config.jadeLocals + "*.json", name:"JADE Locals", emitOnGlob:false}, function() {
        //If the jade .json files have changed, all jade pages should be recompiled.
        config.jadeLocalsChanged = true;
        gulp.start("jade");
    });

    //OTHER ASSETS
	watch({glob:[
        config.src + '/fonts/**',
        config.src + '/thirdparty/**'
    ], name:"Assets", emitOnGlob:false}, ['assets']);

    //Watch the build directories for changes, and execute LiveReload.
	watch({glob:[config.dist + '/**'], name:"LiveReload", emitOnGlob:false})
        .pipe(livereload()); //Execute a LiveReload on changed files in build directory
});
