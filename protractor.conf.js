var config = require('./gulp/config');
var ScreenshotReporter = require('./test/reporters/ScreenshotReporter.js');

exports.config = {
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000,
        isVerbose: true
    },

    specs: config.test.e2e,

    capabilities: {
        'browserName': 'chrome'
    },

    baseUrl: 'http://localhost:' + config.server.port,

    // Selector for the element housing the angular app - this defaults to
    // body, but is necessary if ng-app is on a descendant of <body>
    rootElement: 'body',

    onPrepare: function() {
        jasmine.getEnv().addReporter(new ScreenshotReporter("./reports/protractor/"));
    }
};