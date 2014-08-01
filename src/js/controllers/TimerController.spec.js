describe("Controllers", function() {
    describe("TimerController", function () {
        var scope;
        /** @type {TimerController} */
        var timer;

        //Create the app module
        beforeEach(angular.mock.module(testGlobals.ngAppName));

        beforeEach(inject(function ($rootScope, $controller) {
            scope = $rootScope.$new();

            //Use ControllerAs syntax when instantiating.
            $controller('TimerController as timer', {$scope: scope});
            timer = scope["timer"]; //Get the 'as' property from scope, and assign it a var for easy access.
        }));

        it("Should say hello", function () {
            expect(timer.message).toEqual("Controller says hello");
        });

        it ("Should create a prototype method on this", function() {
            expect(timer.prototypeMethod()).toEqual("I'm a prototype!");
        })
    });
});