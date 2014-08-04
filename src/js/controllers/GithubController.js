/**
 * This file contains a single controller.
 * Notice that it does not use $scope. This is because this controller should be used with the 'ControllerAs' syntax.
 *
 * @param GithubService {GithubService}
 * @constructor
 * @ngInject
 */
function GithubController(GithubService) {
    var scope = this;
    scope.message = "Controller says hello";
    scope.lastCommit = null;

    this.getCommit = function() {
        scope.lastCommit = GithubService.getLastCommit();
    }
}

GithubController.prototype.prototypeMethod = function() {
  return "I'm a prototype!";
};

module.exports = GithubController;