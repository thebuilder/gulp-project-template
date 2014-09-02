var gulp = require("gulp");

/**
 * The deploy reads FTP details from '.ftp.json', and uploads the config.dist directory.
 * If more than one build target exists, you can target a specfic one with:
 * gulp deploy --target ID
 *
 * The .ftp.json file should have the following structure, based on the options used by gulp-ftp: https://github.com/sindresorhus/gulp-ftp
 [{
    "id": "demo",
    "ftp": {
        "host": "",
        "port": 21,
        "user": "",
        "pass": "",
        "remotePath": ""
    }
 }]
 *
 * Another option is to use the systems ENV variables. This should be used when doing continuous deployment.
 * The following variables can be used:
 * FTP_HOST, FTP_PORT, FTP_USER, FTP_PASS, FTP_REMOTE_PATH
 **/
gulp.task('ftp', function () {
    var gutil = require('gulp-util');
    var ftp = require("gulp-ftp");
    var plumber = require("gulp-plumber");
    var config = require("../config");
    var options;

    if (process.env["FTP_HOST"]) {
        gutil.log("Using ENV variables");
        //Running on CI. Use ENV variables.
        options = {
            host: process.env["FTP_HOST"],
            port: process.env["FTP_PORT"] || 21,
            user: process.env["FTP_USER"],
            pass: process.env["FTP_PASS"],
            remotePath: process.env["FTP_REMOTE_PATH"] || "/"
        }
    } else {
        //Read data
        var ftpTargets = require('../.ftp.json');

        if (!ftpTargets) {
            gutil.log(gutil.colors.red("Error:"), "No " + gutil.colors.magenta('.ftp.json') + " file found. Make sure it is created.");
            return null;
        }
        if (!ftpTargets.length) {
            gutil.log(gutil.colors.red("Error:"),  gutil.colors.magenta('.ftp.json') + " file is empty. Make sure it contains at least one deploy target.");
            return null;
        }

        var target = process.env.TARGET_ENV;
        if (ftpTargets.length == 1 || !target) {
            //If only one target exists in the .json file use it.
            if (ftpTargets[0].hasOwnProperty("ftp")) options = ftpTargets[0].ftp;
            else options = ftpTargets[0];
        } else {
            //Find the build target with matching id
            for (var i = 0; i < ftpTargets.length; i++) {
                var obj = ftpTargets[i];
                if (obj.id == target) {
                    gutil.log("Using deploy target:", gutil.colors.yellow(target));
                    options = obj.ftp;
                    break;
                }
            }
        }
    }

    if (options && !!options.host) {
        gutil.log("Deploying to", gutil.colors.yellow(options.host));
        return gulp.src(config.dist + "**/*.*")
            .pipe(plumber())
            .pipe(ftp(options));
    } else {
        if (process.env.FTP_HOST) {
            gutil.log(gutil.colors.red("Error:"), "Failed to read FTP details from ENV.");
        } else {
            gutil.log(gutil.colors.red("Error:"), "Failed to read FTP details from " + gutil.colors.magenta('.ftp.json') + " file." + (target ? " Target not found: " + gutil.colors.cyan(target) : ""));
        }
        return null;
    }
});