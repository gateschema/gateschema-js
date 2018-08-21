"use strict";
exports.__esModule = true;
function genNumber(length) {
    if (length === void 0) { length = 6; }
    return Number(Math.random()
        .toString()
        .slice(-length));
}
exports.genNumber = genNumber;
function genString(length) {
    if (length === void 0) { length = 6; }
    return Array.apply(null, { length: length })
        .map(function (_) { return String.fromCharCode(randomInt(65, 90)); })
        .join('');
}
exports.genString = genString;
function randomInt(min, max) {
    return min + Math.round(Math.random() * (max - min));
}
exports.randomInt = randomInt;
