describe("Filters", function() {
    describe('Checkmark filter', function() {
        var checkmark;

        beforeEach(angular.mock.module(testGlobals.ngAppName));
        beforeEach(inject(function ($injector) {
            //Get the filter
            checkmark = $injector.get('checkmarkFilter');
        }));

        it('Should convert boolean values to unicode checkmark or cross', function() {
            expect(checkmark(true)).toBe('\u2713');
            expect(checkmark(false)).toBe('\u2718');
        });

        it('Should convert string values to unicode checkmark or cross', function() {
            expect(checkmark("true")).toBe('\u2713');
            expect(checkmark("false")).toBe('\u2718');
        });

        it('Should return empty string for unknown types', function() {
            expect(checkmark(321)).toBe('');
            expect(checkmark()).toBe('');
        });
    });
});
