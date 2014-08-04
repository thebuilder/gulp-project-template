var IndexPage = function() {
    this.title = "Gulp Project";

    this.get = function() {
        browser.get('/');
    };
};

module.exports = IndexPage;