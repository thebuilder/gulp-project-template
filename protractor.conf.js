var config = require('./gulp/config');

exports.config = {
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000
    },

    specs: config.test.e2e,

    capabilities: {
        'browserName': 'chrome'
    },

    baseUrl: 'http://localhost:' + config.server.port
};