var gulp = require("gulp");

gulp.task('serve', ['build'], function(){
    var connect = require('connect');
    var gutil = require('gulp-util');
    var http    = require('http');
    var handleErrors = require('../util/handleErrors');
    var ip = require('../util/ip');
    var config  = require('../config');


    var app = connect();
    if (config.server.log) {
        //Log file requests to terminal
        app.use(connect.logger('dev'))
    }
	app.use(connect.static(config.server.root));

    var server = http.createServer(app);
    server.listen(config.server.port);
    server.on("error", handleErrors, false);

    gutil.log("Webserver: " + gutil.colors.magenta("http://localhost:" + config.server.port) + " or " + gutil.colors.magenta("http://" + ip() + ":" + config.server.port));
});
