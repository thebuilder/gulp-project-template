var connect = require('connect');
var gulp    = require("gulp");
var http    = require('http');

var handleErrors = require('../util/handleErrors');
var config  = require('../config');

gulp.task('serve', function(){
	var app = connect();
    if (config.server.log) {
        //Log file requests to terminal
        app.use(connect.logger('dev'))
    }
	app.use(connect.static(config.server.root));

    var server = http.createServer(app);
    server.listen(config.server.port);
    server.on("error", handleErrors);
});
