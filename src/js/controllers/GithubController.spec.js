describe("Controllers", function() {
    describe("GithubController", function () {
        /**
         * @type {GithubController}
         */
        var ctrl;
        /**
         * @type {GithubService}
         */
        var GithubService;
        /**
         * @type {ng.IScope}
         */
        var scope;
        var servicePromise;

        beforeEach(function() {
			//Create the app module
			angular.mock.module(testGlobals.ngAppName);

			/**
			 * Inject all the angular methods you need
			 */
			inject(function ($injector) {
				var $rootScope = $injector.get('$rootScope');
				var $controller = $injector.get('$controller');
				var $q = $injector.get('$q');
				GithubService = $injector.get('GithubService');
				scope = $rootScope.$new();

				//Create a promise for the service method.
				servicePromise = $q.defer();

				//Use ControllerAs syntax when instantiating.
				$controller('GithubController as ctrl', {$scope: scope, GithubService:GithubService});
				ctrl = scope["ctrl"]; //Get the 'as' property from scope, and assign it a var for easy access.
			});
		});

        /**
         * Resolve the service promise.
         * @param shouldSucceed {boolean}
         */
        function resolvePromise(shouldSucceed) {
            // Use $scope.$apply() to get the promise to resolve on nextTick().
            scope.$apply(function() {
                if (shouldSucceed) servicePromise.resolve("Success data"); //Resolve and return data
                else servicePromise.reject("Failed data"); //Resolve and return data
            });
        }

        it("Should create controller with empty data", function () {
            //Data should be null at start.
            expect(ctrl.data).toBeNull();
        });

        it ("Should create a prototype method on this", function() {
            expect(ctrl.prototypeMethod()).toEqual("Create prototypes to extend controller methods");
        });

        it ("Should call service and get data", function() {
            //Set up service spy, and return the promise when called.
            spyOn(GithubService, 'getLastCommit').and.returnValue(servicePromise.promise);

            //Init controller. It will call the service.
            ctrl.init();

            //Resolve
            resolvePromise(true);

            //Get commit should have been called.
            expect(GithubService.getLastCommit).toHaveBeenCalled();
            expect(ctrl.data).toBe("Success data");
        });

        it ("Should call service and handle failed data", function() {
            //Set up service spy, and return the promise when called.
            spyOn(GithubService, 'getLastCommit').and.returnValue(servicePromise.promise);

            //Init controller. It will call the service.
            ctrl.init();

            //Resolve
            resolvePromise(false);

            //Get commit should have been called.
            expect(GithubService.getLastCommit).toHaveBeenCalled();
            expect(ctrl.data).toBeNull(); //Data should still be null.
        });
    });
});