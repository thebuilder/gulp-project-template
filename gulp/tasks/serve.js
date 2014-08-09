var gulp = require("gulp");

gulp.task('serve',  function(){
    var connect = require('connect');
    var http    = require('http');
    var serveStatic = require('serve-static');
    var gutil = require('gulp-util');

    var config  = require('../config');
    var handleErrors = require('../util/handleErrors');
    var ip = require('../util/ip');

    var app = connect();

    app.use(serveStatic(config.server.root));
    
    var server = http.createServer(app);
    server.listen(config.server.port);
    server.on("error", handleErrors, false);

    gutil.log("Webserver: " + gutil.colors.magenta("http://localhost:" + config.server.port) + " or " + gutil.colors.magenta("http://" + ip() + ":" + config.server.port));
});
