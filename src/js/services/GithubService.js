/**
 * Factories give us a singleton module for creating service methods (such as communicating with a server over REST endpoints).
 * Creating and returning a bound Object keeps controller bindings up to date and avoids pitfalls of binding primitive values.
 * Important: A "factory" is in fact a pattern/implementation, and shouldn't be part of the provider's name. All factories and services should be called "services".
 *
 * @name GithubService
 * @param $http {ng.IHttpService} The HTTP service used to make calls.
 * @constructor
 * @ngInject
 */
function GithubService($http) {
    var GithubService = {};

    /**
     * @param user {string}
     * @param repo {string}
     * @return {ng.IHttpPromise<any>|*}
     */
    GithubService.getLastCommit = function(user, repo) {
        var url = "https://api.github.com/repos/"+user+"/"+repo+"/git/refs/heads/master";
        return $http.get(url, {cache: true}).then(function(response) {
            return response.data;
        });
    };

    /**
     * @param user {string}
     * @param repo {string}
     * @return {ng.IHttpPromise<any>|*}
     */
    GithubService.getLastCommitDetails = function(user, repo) {
        //First get the last commit
        return GithubService.getLastCommit(user, repo).then(function(data) {
            //Dig deeper.
            return $http.get(data.object.url, {cache: true}).then(function(response) {
                return response.data;
            });
        });
    };

    return GithubService;
}

module.exports = GithubService;