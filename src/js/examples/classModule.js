/**
 * This module creates a new class instance, and must be instantiated with "new".
 * The reason this must be instantiated is that the exports is a function.
 * @returns {{greeting: greeting}}
 * @constructor
 */
function ClassModule() {
    function greeting() {

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