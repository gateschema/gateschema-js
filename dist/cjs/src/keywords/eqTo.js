"use strict";
exports.__esModule = true;
exports["default"] = {
    isHighOrder: true,
    name: 'eqTo',
    validator: function (value, _a, cb) {
        var path = _a.path, rootData = _a.rootData, state = _a.state, args = _a.args;
        var targetId = args[0];
        var targetValue = this.getValue(targetId, rootData, path, state.values);
        if (value !== targetValue) {
            return cb({
                id: targetId
            });
        }
        return cb();
    }
};
