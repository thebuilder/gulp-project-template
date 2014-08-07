function CheckmarkFilter() {
    return function(input) {
        if (typeof input === 'boolean')
            return input ? '\u2713' : '\u2718';
        else if (typeof input === 'string')
            return input == "true" ? '\u2713' : '\u2718';
        //Unknown input. Return ""
        return "";
    };
}

module.exports = CheckmarkFilter;