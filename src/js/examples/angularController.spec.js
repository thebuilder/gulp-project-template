describe("test controller", function () {
    var $scope;

    //Create the app module
    beforeEach(angular.mock.module('gulpApp'));

    beforeEach(inject(function ($rootScope, $controller) {
        $scope = $rootScope.$new();

        $controller('angularController', {
            $scope: $scope
        });
    }));

    it("Should say hello", function () {
        expect($scope.message).toEqual("Controller says hello");
    });
});