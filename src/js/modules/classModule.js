/**
 * @module classModule
 * This module creates a new class instance, and must be instantiated with "new".
 * The reason this must be instantiated is that the exports is a function.
 * var module = new classModule();
 */

module.exports = function() {
    //You can create functions, vars and whatever you want here.
    var object = {
        name:"New class"
    };

    return object;
};
