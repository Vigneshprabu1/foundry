const parseDate = require('../lib/parseDate');
const dateStrings = require('./dateStrings');

const centuries = require('../lib/centuries');
const decades = require('../lib/decades');
const hundreds = require('../lib/hundreds');
const thousands = require('../lib/thousands');

module.exports = (date) => {
    // We need to sanitize the date by first creating a new date and then getting the individual values for day, month, & year.
    let dateMap = parseDate(date);
    let stringifiedYear = dateMap.year.toString();

    // 10/23/1945 => October twenty third nineteen fourty five
    let month = dateStrings.months[dateMap.month];
    let day = dateStrings.ordinals[dateMap.day];
    let year = '';

    if (dateMap.year % 100 === 0) {
        // Then this is a year to be suffixed with thousand (e.g. 2000) or with a hundred (e.g. 1900)
        year = centuries(stringifiedYear);
    } else {
        if (dateMap.year >= 1000) {
            year += thousands(stringifiedYear);
        }
        
        if (dateMap.year >= 99) {
            year += hundreds(stringifiedYear);
        }

        year += decades(stringifiedYear);
    }

    return `${month} ${day}, ${year}`; 
};
