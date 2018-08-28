import Big from 'big.js';
export default {
    name: 'number',
    validator: function (value, _a, cb) {
        var path = _a.path, state = _a.state;
        state.types[path] = 'number';
        try {
            new Big(value);
        }
        catch (e) {
            return cb(true);
        }
        cb();
    }
};
//# sourceMappingURL=number.js.map