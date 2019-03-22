const dateStrings = require('../core/dateStrings');

module.exports = (year) => {
    if (year % 1000 === 0) {
        // Then this is a year to be suffixed with thousand. EX: 2000, 5000, 17000, etc.
        let firstDigit = parseInt(year.charAt(0));
        
        return `${dateStrings.ones[firstDigit]} thousand`;
    } else {
        // Then this is a year that needs to be suffixed with hundred. EX: 1500, 1900, etc.
        let firstTwoDigits = parseInt(year.slice(0, 2));

        return `${dateStrings.ones[firstTwoDigits]} hundred`;
    }
};
