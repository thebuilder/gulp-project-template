var IndexPage = require("./pages/index.page");

describe('app', function () {
    var page = new IndexPage();

    beforeEach(function() {
        page.get();
    });

    it('Should create app', function () {
        expect(browser.getTitle()).toEqual(page.title);
    });
});