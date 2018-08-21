"use strict";
exports.__esModule = true;
var util_1 = require("../util");
exports["default"] = {
    name: 'binary',
    validator: function (value, _a, cb) {
        var path = _a.path, state = _a.state;
        state.types[path] = 'binary';
        if (util_1.isBase64(value)) {
            return cb();
        }
        if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
            return cb();
        }
        cb(true);
    }
};
