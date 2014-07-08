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
    jadeLocals: 'data/',

    //Only recompiles Jade pages if it has been changed. Changing data/included files will not trigger a rebuild if this set to true.
    onlyCompileChangedPages: false,

    //Runtime vars. These are used by tasks.
    isReleaseBuild: false
};