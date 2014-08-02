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

    //Output directory
    src: "src/",
    dist: "dist/",
    releases: "releases/",

    test: {
        root: 'test/',
        spec: 'src/**/*.spec.js',
        e2e: ['src/**/*.scenario.js',
            'test/**/*.scenario.js']
    },

    js: {
       src: 'src/js/app.js',
       dir: 'js',
       name: 'app.js'
    },

    less: {
       src: 'src/less/app.less',
       dir: 'css',
       name: 'app.less'
    },

    jade: {
       src: 'src/*.jade',
       dir: 'views',
       data: 'src/views/data/'
    },

    img: {
        src: 'src/img/**/{*.png,*.jpg,*.gif,*.svg}',
        dir: 'img'
    },

    assets: {
      src: ['fonts/**',
            'thirdparty/**',
            '!**/*.md'
      ]
    },

    //Runtime vars. These are used by tasks.
    isReleaseBuild: false
};