"use strict";
exports.__esModule = true;
var NUMERIC = /^-?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i;
exports["default"] = {
    name: 'number',
    validator: function (value, _a, cb) {
        var path = _a.path, state = _a.state;
        state.types[path] = 'number';
        if (typeof value === 'number' || NUMERIC.test(value)) {
            return cb();
        }
        cb(true);
    }
};
