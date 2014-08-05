/**
 * Usage:
 * <timer-directive></timer-directive>
 * @constructor
 * @ngInject
 */
function timerDirective($interval, dateFilter) {
    return {
        restrict: 'EA',
        template: require('./timerDirective.jade'),
        replace: true,
        link: function ($scope, $element, $attrs) {
            var timeoutId;

            function updateTime() {
                $element.text(dateFilter(new Date(), "d/M/yy H:mm:ss"));
            }

            $element.on('$destroy', function() {
                $interval.cancel(timeoutId);
            });

            // start the UI update process; save the timeoutId for canceling
            timeoutId = $interval(function() {
                updateTime(); // update DOM
            }, 1000);

            updateTime();
        }
    };
}

module.exports = timerDirective;