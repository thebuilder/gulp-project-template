/**
 * @module basicModule
 * This module creates a static module with public properties.
 * var module = require("./basicModule")
 */
module.exports = {
    init: function() {
        var value = privateMethod();
        return value;
    },
    dispose: function() {},
    //Just a var
    name: "Hello World"
};

function privateMethod() {
    return "Hello from private";
}