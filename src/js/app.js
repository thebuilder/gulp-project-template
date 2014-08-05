/**
 * Require Angular. Type declared with Definitely Typed.
 * @type {ng.IAngularStatic|exports}
 */
var angular = require("angular");

angular.module("gulpApp", [])
    .factory("GithubService", require("./services/GithubService"))
    .service("OtherService", require("./services/OtherService"))

    .controller("GithubController", require("./controllers/GithubController"))

    .directive("timerDirective", require("./directives/timer/timerDirective"));