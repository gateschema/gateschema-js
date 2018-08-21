"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: 'allowAdditional',
    validator: function (value, _a, cb) {
        var path = _a.path, state = _a.state;
        state.mapAllowAdditional[path] = true;
        cb();
    }
};
//# sourceMappingURL=allowAdditional.js.map