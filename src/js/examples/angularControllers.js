/**
 * A file can contain multiple constructors by assigning them to the exports object as functions.
 */

/**
 * @param $scope
 * @constructor
 */
exports.StaticController = function($scope) {
    $scope.message = "Static Controller says hello";
};

/**
 * @param $scope
 * @constructor
 */
exports.StaticController2 = function($scope) {
    $scope.message = "Static Controller 2 says hello";
};