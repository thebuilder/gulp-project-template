/**
 * This module creates a new class instance, and must be instantiated with "new".
 * The reason this must be instantiated is that the exports is a function.
 * @param config {Object}
 * @returns {{greeting: greeting}}
 * @constructor
 */
function ClassModule(config) {
    /**
     * Say hello!
     */
    function greeting() {
        console.log("Hello world", config);
    }

    /**
     * Return all public methods
     */
    return {
        greeting:greeting
    };
}

//Export the Constructor
module.exports = ClassModule;