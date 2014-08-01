describe("Directives", function() {
   describe("Timer", function() {
       var element;
       beforeEach(angular.mock.module(testGlobals.ngAppName));

       beforeEach(inject(function ($injector) {
           var $rootScope = $injector.get('$rootScope');
           var $compile = $injector.get("$compile");

           element = angular.element("<timer-directive></timer-directive>");
           $compile(element)($rootScope);
           $rootScope.$digest();
       }));

       it("compile", function () {
           expect(element).toBeDefined()
       })
   })
});