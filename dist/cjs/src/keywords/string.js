"use strict";
exports.__esModule = true;
exports["default"] = {
    name: 'string',
    validator: function (value, _a, cb) {
        var path = _a.path, state = _a.state;
        state.types[path] = 'string';
        cb(typeof value !== 'string');
    }
};
