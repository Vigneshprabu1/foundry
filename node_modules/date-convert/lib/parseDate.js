module.exports = (dateInput) => {
    switch (typeof dateInput) {
        // String will be a standard input, number is most likely a UTC date.
        case 'string':
        case 'number':
            dateInput = new Date(dateInput);
            break;

        default:
            // We assume this is already a Date object.
            break;
    }

    const dateMap = {
        day: dateInput.getUTCDate(),
        month: dateInput.getUTCMonth(),
        year: dateInput.getUTCFullYear(),
    };

    if (parseInt(dateMap.year, 10) >= 9999) {
        throw new Error('9999 CE is the latest supported date.');
    }

    return dateMap;
};
