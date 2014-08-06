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
    scope.data = null;

    /**
     * Fetch data when calling init
     */
    scope.init = function() {
        GithubService.getLastCommit("thebuilder", "gulp-project-template").then(onDataReady);
    };

    function onDataReady(data) {
        scope.data = data;
    }
}

GithubController.prototype.prototypeMethod = function() {
  return "Create prototypes to extend controller methods";
};

module.exports = GithubController;