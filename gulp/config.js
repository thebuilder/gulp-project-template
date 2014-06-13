var path = require('path');

module.exports = {
    server: {
        root: path.resolve('./build'),
        port: '8080',
        log: true,

        //Auto open browser on gulp run?
        openBrowser: true,
        browser: "google chrome canary"
    },

    //Paths
    src: 'src',
    templates: 'templates',
    dist: 'build',

    //Content dirs
    jsDir: 'js',
    lessDir: 'less',
    imgDir: 'img',

    //Entry files
    mainLess: 'app.less',
    mainJs: 'app.js',
    jadeFiles: 'views/pages/*.jade',

    //Runtime vars. These are used by tasks.
    isReleaseBuild: false
};