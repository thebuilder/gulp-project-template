var IndexPage = function() {
    this.title = "Gulp Poject";

    this.get = function() {
        browser.get('/');
    };
};

module.exports = IndexPage;