describe("Service", function() {
    describe("GithubService", function () {
        /** @type GithubService */
        var service;
        var httpBackend;
        var gitCommitUrl = "https://api.github.com/repos/thebuilder/gulp-project-template/git/refs/heads/master";
        var gitCommitData = {
            "object": {
                "type": "commit",
                "url": "https://api.github.com/repos/thebuilder/gulp-project-template/git/commits/45a5e0c48910ec48af8773669c66c6f197362f8e"
            }
        };
        var gitCommitDetails = {
            "tree": {
                "url": "https://api.github.com/repos/thebuilder/gulp-project-template/git/trees/81387b82de121713e0efc3c23b6e260acbc7d10a"
            },
            "message": "Update README.md"
        };


        //Create the app module
        beforeEach(angular.mock.module(testGlobals.ngAppName));

        beforeEach(inject(function ($injector) {
            var $rootScope = $injector.get('$rootScope');
            httpBackend = $injector.get('$httpBackend');
            service = $injector.get('GithubService');

            //Setup URL endpoints
            httpBackend.whenGET(gitCommitUrl).respond(gitCommitData);
            httpBackend.whenGET(gitCommitData.object.url).respond(gitCommitDetails);
            httpBackend.whenGET(gitCommitDetails.tree.url).respond({tree:{}});
        }));

        afterEach(function() {
            /* Verify that no requests are unhandled. */
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
        });

        it("Should get last commit from Github", function () {
            httpBackend.expectGET(gitCommitUrl);
            service.getLastCommit("thebuilder", "gulp-project-template");
            httpBackend.flush();
        });

        it("Should get last commit details from Github", function () {
            httpBackend.expectGET(gitCommitUrl);
            httpBackend.expectGET(gitCommitData.object.url);
            service.getLastCommitDetails("thebuilder", "gulp-project-template");
            httpBackend.flush();
        });

        it("Should get last commit tree from Github", function () {
            httpBackend.expectGET(gitCommitUrl);
            httpBackend.expectGET(gitCommitData.object.url);
            httpBackend.expectGET(gitCommitDetails.tree.url);
            service.getLastCommitTree("thebuilder", "gulp-project-template");
            httpBackend.flush();
        });
    });
});