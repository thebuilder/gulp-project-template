/**
 * Factories give us a singleton module for creating service methods (such as communicating with a server over REST endpoints).
 * Creating and returning a bound Object keeps controller bindings up to date and avoids pitfalls of binding primitive values.
 * Important: A "factory" is in fact a pattern/implementation, and shouldn't be part of the provider's name. All factories and services should be called "services".
 * @name TimerService
 * @constructor
 * @ngInject
 */
function TimerService() {
    var TimerService = {};

    /**
     * Get the current time
     * @returns {Date}
     */
    TimerService.getCurrentTime = function() {
        return new Date();
    };

    return TimerService;
}

module.exports = TimerService;