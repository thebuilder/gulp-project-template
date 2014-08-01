/**
 * Services are classes and are instantiated with the new keyword, use this for public methods and variables
 * @name OtherService
 * @constructor
 * @ngInject
 */
function OtherService() {
    /**
     * Get the current time
     * @returns {Date}
     */
    this.getCurrentTime = function() {
        return new Date();
    };
}

module.exports = OtherService;