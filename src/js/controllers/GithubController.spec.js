describe("Controllers", function() {
    describe("GithubController", function () {
        /**
         * @type {ng.IScope}
         */
        var scope;
        /**
         * @type {GithubController}
         */
        var ctrl;
        var GithubService;

        //Create the app module
        beforeEach(angular.mock.module(testGlobals.ngAppName));

        beforeEach(inject(function ($injector) {
            var $rootScope = $injector.get('$rootScope');
            var $controller = $injector.get('$controller');
            GithubService = $injector.get('GithubService');
            scope = $rootScope.$new();

            //Use ControllerAs syntax when instantiating.
            $controller('GithubController as ctrl', {$scope: scope, GithubService:GithubService});
            ctrl = scope["ctrl"]; //Get the 'as' property from scope, and assign it a var for easy access.
        }));

        it("Should say hello", function () {
            expect(ctrl.message).toEqual("Controller says hello");
        });

        it ("Should create a prototype method on this", function() {
            expect(ctrl.prototypeMethod()).toEqual("I'm a prototype!");
        });

        it ("Should call service and get data", function() {
            expect(ctrl.lastCommit).toBeNull();
            spyOn(GithubService, "getLastCommit").and.returnValue({});
            ctrl.getCommit();
            expect(GithubService.getLastCommit).toHaveBeenCalled();
            expect(ctrl.lastCommit).not.toBeNull();
        })
    });
});