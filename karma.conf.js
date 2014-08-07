// Karma configuration
module.exports = function (config) {
    config.set({
        // base path, that will be used to resolve files and exclude
        basePath: '',

        // frameworks to use
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [
            'dist/js/vendor.min.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'test/test.globals.js',

            'test/bundle/test.bundle.js',
            'test/bundle/app.coverage.js' //Use the special app.coverage.js to get code coverage.
        ],

        // test results reporter to use
        // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
        reporters: ['progress', 'coverage'],

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_WARN,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: ['PhantomJS'],

        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 60000,

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false,

        preprocessors: {
            'test/bundle/*.js': ['sourcemap'],
            'src/js/app.js': ['coverage'] //Makes Webstorm support coverage runs.
        },

        coverageReporter: {
            type : 'html',
            dir : 'test/reports/coverage/',
            subdir: function(browser) {
                // normalization process to keep a consistent browser name across different OS
                return browser.toLowerCase().split(/[ /-]/)[0];
            }
        }
    });
};
