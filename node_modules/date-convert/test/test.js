const assert = require('assert');
const translate = require('../core/convert');
const dateStrings = require('../core/dateStrings');
const parseDate = require('../lib/parseDate');

const centuries = require('../lib/centuries');
const decades = require('../lib/decades');
const hundreds = require('../lib/hundreds');
const thousands = require('../lib/thousands');

describe('converts specific year digits', function() {
    it('converts thousands digit properly', function() {
        assert.equal(thousands('2000'), 'two thousand ');
        assert.equal(thousands('1900'), '');
    });

    it('converts hundreds digit properly', function() {
        assert.equal(hundreds('1000'), '');
        assert.equal(hundreds('1800'), 'eighteen hundred ');
        assert.equal(hundreds('1900'), 'nineteen hundred ');
        assert.equal(hundreds('2100'), 'one hundred ');
    });

    it('converts decade digits properly', function() {
        assert.equal(decades('2019'), 'nineteen');
        assert.equal(decades('2010'), 'ten');
        assert.equal(decades('2003'), 'three');
        assert.equal(decades('2000'), '');
    });

    it('gracefully handles years greater than 9999', function() {
        assert.throws(function() { parseDate('10000-01-01') }, Error);
    });
});

describe('converts standard date formats properly', function() {
    const testValues = {
        // TODO: Change these dates to major historical dates
        isoDate: "2015-03-25",
        shortDate: "03/25/2015",
        longDate: "Mar 25 2015",
        longDateReverse: "25 Mar 2015",
        fullDate: "Wednesday March 25 2015",
    }

    it('converts an ISO Date string (2015-03-25)', function() {
        assert.equal(translate(testValues.isoDate), 'March twenty fifth, two thousand fifteen');
    });

    it('converts a short date string (03/25/2015)', function() {
        assert.equal(translate(testValues.shortDate), 'March twenty fifth, two thousand fifteen');
    });

    it('converts a long date string (Mar 25 2015)', function() {
        assert.equal(translate(testValues.longDate), 'March twenty fifth, two thousand fifteen');
    });

    it('converts a reversed long date string (25 Mar 2015)', function() {
        assert.equal(translate(testValues.longDateReverse), 'March twenty fifth, two thousand fifteen');
    });

    it('converts a full date string (Wednesday March 25 2015)', function() {
        assert.equal(translate(testValues.fullDate), 'March twenty fifth, two thousand fifteen');
    });

    it('converts an ISO date object', function() {
        assert.equal(translate(new Date('2015-03-25')), 'March twenty fifth, two thousand fifteen');
    });
});

describe('it also converts special case years', function() {
    const testValues = {
        kubrick: "01/01/2001",
        secondZero: "02/02/2010",
        thirdZero: "03/03/2103",
        century: "04/04/1900",
        millenium: "05/05/2000",
        random1: "06/06/2045",
        subThousand: "06/06/465"
    }

    it('converts a year with two zeros (01/01/2001)', function() {
        assert.equal(translate(testValues.kubrick), 'January first, two thousand one');
    });

    it('converts a year with a ten in the last pair (02/02/2010)', function() {
        assert.equal(translate(testValues.secondZero), 'February second, two thousand ten');
    });

    it('converts a year with a zero in the third place (03/03/2103)', function() {
        assert.equal(translate(testValues.thirdZero), 'March third, two thousand one hundred three');
    });
    
    it('converts a sub 1000 year', function() {
        assert.equal(translate(testValues.subThousand), 'June sixth, four hundred sixty five');
    });

    it('converts a centennial year (04/04/1900)', function() {
        assert.equal(translate(testValues.century), 'April fourth, nineteen hundred');
    });

    it('converts a millenium year (05/05/2000)', function() {
        assert.equal(translate(testValues.millenium), 'May fifth, two thousand');
    });

    it('converts a short date string (06/06/2045)', function() {
        assert.equal(translate(testValues.random1), 'June sixth, two thousand forty five');
    });
});
