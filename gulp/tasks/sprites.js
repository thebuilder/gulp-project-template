var gulp = require('gulp');
var plumber = require('gulp-plumber');
var imagemin = require('gulp-imagemin');
var svgSprites = require('gulp-svg-sprites');
var svg = svgSprites.svg;
var png = svgSprites.png;
var config = require('../config.js');

gulp.task('sprites', ['generate-sprites'], function () {
    //After the sprites have beeen generated, copy them to the image directory.
    return gulp.src(config.src + '/sprites/img/*.*')
        .pipe(plumber())
        .pipe(imagemin())
        .pipe(gulp.dest(config.dist + '/' + config.imgDir));
});

gulp.task('generate-sprites', function () {
    return gulp.src(config.src + '/sprites/svgs/**/*.svg')
        .pipe(plumber())
        .pipe(svg({
            className: '.icon-%f',
            cssFile: "css/_sprites.css",
            svg: {
                sprite: "img/svg-sprite.svg"
            },
            preview: {
                sprite: "svg-sprites.html"
            }
        }))
        .pipe(gulp.dest(config.src + '/sprites'))
        .pipe(png());
});