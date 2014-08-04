describe("Service", function() {
    describe("GithubService", function () {
        /** @type GithubService */
        var service;
        var httpBackend;
        var gitCommitUrl = "https://api.github.com/repos/thebuilder/gulp-project-template/git/refs/heads/master";

        //Create the app module
        beforeEach(angular.mock.module(testGlobals.ngAppName));

        beforeEach(inject(function ($injector) {
            var $rootScope = $injector.get('$rootScope');
            httpBackend = $injector.get('$httpBackend');
            service = $injector.get('GithubService');

            //Setup URL endpoints
            httpBackend.whenGET(gitCommitUrl).respond({});
        }));

        afterEach(function() {
            /* Verify that no requests are unhandled. */
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
        });

        it("Should get commits from Github", function () {
            httpBackend.expectGET(gitCommitUrl);
            service.getLastCommit();
            httpBackend.flush();
        });
    });
});