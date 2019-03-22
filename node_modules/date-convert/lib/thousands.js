const dateStrings = require('../core/dateStrings');

module.exports = (year) => {
    let frontPair = parseInt(year.slice(0, 2));
    let thousandDigit = parseInt(year.charAt(0));

    if (frontPair < 20) {
        return '';
    }

    return `${dateStrings.ones[thousandDigit]} thousand `;
};
