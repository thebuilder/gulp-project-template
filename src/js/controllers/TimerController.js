/**
 * This file contains a single controller.
 *
 * @param TimerService {TimerService}
 * @constructor
 * @ngInject
 */
function TimerController(TimerService) {
    this.message = "Controller says hello";

    this.getTime = function() {
        return TimerService.getCurrentTime();
    }
}

TimerController.prototype.prototypeMethod = function() {
  return "I'm a prototype!";
};

module.exports = TimerController;