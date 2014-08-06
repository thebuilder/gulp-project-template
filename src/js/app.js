/**
 * Require Angular. Type declared with Definitely Typed.
 * @type {ng.IAngularStatic|exports}
 */
var angular = require("angular");

angular.module("gulpApp", [])
    .factory("GithubService", require("./services/GithubService"))

    .filter("checkmark", require("./filters/checkmarkFilter"))

    .controller("GithubController", require("./controllers/GithubController"))

    .directive("timerDirective", require("./directives/timer/timerDirective"));
