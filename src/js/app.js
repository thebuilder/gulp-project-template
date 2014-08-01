var angular = require("angular");

angular.module("gulpApp", [])
    .factory("TimerService", require("./services/TimerService"))
    .service("OtherService", require("./services/OtherService"))

    .controller("TimerController", require("./controllers/TimerController"))

    .directive("timerDirective", require("./directives/timer/timerDirective"));
