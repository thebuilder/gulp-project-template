var notify = require("gulp-notify");
var gutil = require('gulp-util');

module.exports = function() {
	var args = Array.prototype.slice.call(arguments) || {};

    var isWindows = /^win/.test(require('os').platform());
    if (!isWindows) {
        // Send error to notification center with gulp-notify
        notify.onError({
            title: "Compile Error",
            message: "<%= error.message %>",
            sound: "Submarine",
            emitError: false
        }).apply(this, args);
    } else {
        //Gulp notify not supported on Windows, so print the message instead.
        gutil.log("[" +  gutil.colors.blue("Compile Error") + "] " + gutil.colors.red.apply(this, args) )
    }

	// Keep gulp from hanging on this task
	this.emit('end');
};