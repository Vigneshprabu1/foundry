![date-convert](./images/logo.png)

# Sentence Format Date Converter

[![Build Status](https://travis-ci.org/LanceTurri/date-convert.svg?branch=develop)](https://travis-ci.org/LanceTurri/date-convert)
[![Coverage Status](https://coveralls.io/repos/github/LanceTurri/date-convert/badge.svg?branch=develop)](https://coveralls.io/github/LanceTurri/date-convert?branch=develop)

This library is meant for applications to take dates in a standard format (`string` or `Date object`) and convert them into a human readable, sentence format.

## Installation

Install via npm:

```sh
$ npm install date-convert
```

Or via yarn:

```sh
$ yarn add date-convert
```

## Translate the Dates!
The main function in this library will take any string date or Date object and convert it to a sentence. This is an example of how to use it:

```javascript
const convertDate = require('date-convert');

convertDate("2015-03-25") // => 'March twenty fifth, two thousand fifteen'
```

Any format that can be read by the Date constructor will be able to be converted. Here are some common formats:

```javascript
convertDate('2010-03-25') // => 'March twenty fifth, two thousand ten'
convertDate('07/04/1776') // => 'July fourth, seventeen seventy six'
convertDate('August 29 2456') // => 'August twenty ninth, two thousand fifty six'
convertDate('01/01/2000') // => 'January first, two thousand'
convertDate('Tuesday March 15, 462') // => 'March fifteenth, four hundred sixty two'
```

## License

Copyright Lance Turri. Released under the terms of the MIT license.
