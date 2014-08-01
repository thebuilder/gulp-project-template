/**
 * Usage:
 * <timer-directive></timer-directive>
 * @constructor
 * @ngInject
 */
function timerDirective() {
    return {
        restrict: 'EA',
        template: require('./timerDirective.jade'),
        controller: "TimerController",
        link: function ($scope, $element, $attrs) {
        }
    };
}

module.exports = timerDirective;