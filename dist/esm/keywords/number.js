var NUMERIC = /^-?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i;
export default {
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
//# sourceMappingURL=number.js.map