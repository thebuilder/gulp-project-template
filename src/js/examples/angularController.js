/**
 * This file contains a single controller, that gets instantiate by calling new require('./angularController').
 *
 * @param $scope
 * @constructor
 */
function ExampleController($scope) {
    $scope.message = "Controller says hello";
}

module.exports = ExampleController;