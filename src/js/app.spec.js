describe("App", function() {
    beforeEach(angular.mock.module(testGlobals.ngAppName));

    it("Should have 'gulpApp' ngApp", function() {
        var app = angular.module(testGlobals.ngAppName);
        expect(app).toBeDefined();
    });
});