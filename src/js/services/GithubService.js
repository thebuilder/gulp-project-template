/**
 * Factories give us a singleton module for creating service methods (such as communicating with a server over REST endpoints).
 * Creating and returning a bound Object keeps controller bindings up to date and avoids pitfalls of binding primitive values.
 * Important: A "factory" is in fact a pattern/implementation, and shouldn't be part of the provider's name. All factories and services should be called "services".
 * @name GithubService
 * @constructor
 * @ngInject
 */
function GithubService($http) {
    var GithubService = {};

    GithubService.getLastCommit = function() {
        var url = "https://api.github.com/repos/thebuilder/gulp-project-template/git/refs/heads/master";
        return $http.get(url);
    };

    return GithubService;
}

module.exports = GithubService;