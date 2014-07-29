var path = require('path');

module.exports = {
    server: {
        root: path.resolve('./dist/'),
        indexFile: 'index.html',
        port: '8080',
        log: true,

        //Auto open browser on gulp run?
        openBrowser: true,
        browser: 'google chrome canary'
    },

    test: {
        root: 'test/',
        e2e: ['src/**/*.scenario.js',
            'test/**/*.scenario.js']
    },

    //Paths
    src: 'src/',
    dist: 'dist/',
    releases: 'releases/',

    //Content dirs
    jsDir: 'js/',
    lessDir: 'less/',
    imgDir: 'img/',
    viewsDir: 'views/',

    //Entry files
    mainLess: 'app.less',
    mainJs: 'app.js',
    jadeFiles: '*.jade',
    jadeData: 'views/data/',

    //Runtime vars. These are used by tasks.
    isReleaseBuild: false
};