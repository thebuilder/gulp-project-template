var path = require('path');

module.exports = {
    server: {
        root: path.resolve('./dist/'),
        indexFile: 'index.html',
        port: '3000',
        log: true,

        browser: 'google chrome canary'
    },

    //Output directory
    src: "src/",
    dist: "dist/",
    releases: "releases/",

    test: {
        root: 'test/',
        bundleDir: 'test/bundle/',
        bundleFile: 'test.bundle.js',
        coverageFile: 'app.coverage.js',
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
    isReleaseBuild: false,

	configureEnv: configureEnv
};

function configureEnv() {
	var argv = require('minimist')(process.argv.slice(2));

	//Configure NODE_ENV
	if (argv['release']) {
		process.env.NODE_ENV = 'production';
		module.exports.isReleaseBuild = true;
	} else if (!process.env.NODE_ENV) {
		//Default to 'development' NODE_ENV
		process.env.NODE_ENV = 'development';
	}

	//Target ENV set by --target dev
	process.env.TARGET_ENV = argv["target"] || argv["t"] || process.env.TARGET_ENV || 'local';
}