var path = require('path');

module.exports = {
    server: {
        root: path.resolve('./dist'),
        port: '8081',
        log: true,

        //Auto open browser on gulp run?
        openBrowser: true,
        browser: "google chrome canary"
    },

    //Paths
    src: 'src',
    dist: 'dist',

    //Content dirs
    jsDir: 'js',
    lessDir: 'less',
    imgDir: 'img',

    //Entry files
    mainLess: 'app.less',
    mainJs: 'app.js',
    jadeFiles: 'views/pages/*.jade',
    jadeLocals: 'views/data/',

    //Runtime vars. These are used by tasks.
    isReleaseBuild: false,
    jadeLocalsChanged: false
};