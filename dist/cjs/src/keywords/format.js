"use strict";
exports.__esModule = true;
var format_validator_1 = require("./format_validator");
exports["default"] = {
    isHighOrder: true,
    name: 'format',
    validator: function (value, _a, cb) {
        var args = _a.args;
        var format = args[0];
        var validator = format_validator_1["default"][format];
        if (validator) {
            if (!validator(value)) {
                return cb({
                    format: format
                });
            }
            return cb();
        }
        return cb(new Error("no validator for format: " + format));
    }
};
