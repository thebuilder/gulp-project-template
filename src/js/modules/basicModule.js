/**
 * @module basicModule
 * This module creates a static module with public properties.
 * var module = require("./basicModule")
 */
module.exports = {
    /**
     * @param {Object} config Configuration object to pass the method
     * @returns {String}
     */
    init: function(config) {
        var value = privateMethod();
        return value;
    },
    dispose: function() {
    },

    name: "Hello World"
};

/**
 * You can also create props on the exports object
 */
exports.exportsMethod = function() {
};


/**
 * Methods outside the exports will still be placed in the module, but be private.
 * @returns {string}
 */
function privateMethod() {
    return "Hello from private";
}