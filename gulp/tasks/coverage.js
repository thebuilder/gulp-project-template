var gulp = require('gulp');

gulp.task('coverage', function () {
    return compile(false);
});

gulp.task('coverage-watch', function () {
    return compile(true);
});

function compile(watch) {
    var watchify = require('watchify');
    var browserify = require('browserify');
    var istanbul = require('browserify-istanbul');
    var source = require('vinyl-source-stream');

    var handleErrors = require('../util/handleErrors');
    var config = require('../config');

    var opts = {debug:true, extensions: [".js"]};
    var bundler;
    if (watch) {
        //bundler = watchify(browserify(extend(opts, watchify.args)));
        bundler = watchify();
    } else {
        bundler = browserify();
    }

    bundler.add("./" + config.js.src);

    bundler.transform(istanbul({
        // ignore these glob paths (the ones shown are the defaults)
        ignore: ['**/*.spec.js', '**/*.jade', '**/*.json']
    }));

    //Wrap the bundle method in a function, so it can be called by watchify
    function rebundle() {
        return bundler.bundle(opts)
            .on('error', function(error) {
                handleErrors(error); //Break the pipe by placing error handler outside
            })
            .pipe(source("app.coverage.js"))
            .pipe(gulp.dest(config.test.root));
    }

    if (watch) {
        bundler.on('update', rebundle);
    }
    return rebundle();
}
