"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: 'string',
    validator: function (value, _a, cb) {
        var path = _a.path, state = _a.state;
        state.types[path] = 'string';
        cb(typeof value !== 'string');
    }
};
//# sourceMappingURL=string.js.map