describe("Directives", function() {
   describe("Timer", function() {
       var element, $interval;
       beforeEach(angular.mock.module(testGlobals.ngAppName));

       beforeEach(inject(function ($injector) {
           var $compile = $injector.get("$compile");
           var $rootScope = $injector.get('$rootScope');
           $interval = $injector.get("$interval");

           element = angular.element("<timer-directive></timer-directive>");
           $compile(element)($rootScope);
           $rootScope.$digest();
       }));

       it("Should compile and update time", function () {
           expect(element).toBeDefined();
           expect(element).toHaveClass("timer");
           $interval.flush(1000);
       });

       it("Should cancel $interval when destroyed", function () {
           //Should call cancel when destroyed
           spyOn($interval, "cancel").and.callThrough();

           //Remove it
           element.remove();
           expect($interval.cancel).toHaveBeenCalled();
           expect($interval.cancel.calls.count()).toEqual(1);
           expect(element.scope()).toBeUndefined(); //Should be destroyed.
       })
   })
});