"use strict";
exports.__esModule = true;
exports["default"] = {
    name: 'unique',
    validator: function (values, ctx, cb) {
        var uniqueValues = [];
        for (var i = 0, length_1 = values.length; i < length_1; i++) {
            var value = values[i];
            if (uniqueValues.indexOf(value) === -1) {
                uniqueValues.push(value);
                continue;
            }
            return cb(true);
        }
        cb();
    }
};
