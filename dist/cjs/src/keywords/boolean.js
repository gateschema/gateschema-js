"use strict";
exports.__esModule = true;
exports["default"] = {
    name: 'boolean',
    validator: function (value, _a, cb) {
        var path = _a.path, state = _a.state;
        state.types[path] = 'boolean';
        cb(typeof value !== 'boolean');
    }
};
