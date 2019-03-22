function batchDateTime(s) {
    if (!s) {
        return s
    }
    var s1 = s.toString();
    var res = s1.substring(0, 10);

    var parts = res.split('-');
    // new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
    var date = new Date(parts[0], parts[1], parts[2]); // Note: months are 0-based
    return date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
}
