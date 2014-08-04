var gulp = require('gulp');
var gutil = require('gulp-util');

var config = require('../config');
var handleErrors = require('../util/handleErrors');

var server;

// Run e2e tests using protractor.
gulp.task('protractor', ['webdriver:update'], function() {
    var protractor = require('gulp-protractor').protractor;
    startServer();

    return gulp.src(config.test.e2e)
        .pipe(protractor({
            configFile: 'protractor.conf.js'
        }))
        .on('error', onError)
        .on('end', stopServer);
});

function onError() {
    stopServer();
}

function startServer(){
    var connect = require('connect');
    var http    = require('http');
    var handleErrors = require('../util/handleErrors');
    var config  = require('../config');

    gutil.log("Start web server");
    var app = connect();
    //app.use(connect.logger('dev'));
    app.use(connect.static(config.server.root));

    server = http.createServer(app);
    server.listen(config.server.port);
    server.on("error", handleErrors, false);
}

function stopServer() {
    if (server) {
        gutil.log("Close web server");
        server.close();
        server = null;
    }
}

// Update/install webdriver.
gulp.task('webdriver:update', require('gulp-protractor').webdriver_update);
