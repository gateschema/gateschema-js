import Big from 'big.js';
export default {
    isHighOrder: true,
    name: 'min',
    validator: function (value, _a, cb) {
        var path = _a.path, state = _a.state, args = _a.args;
        var min = args[0], isExclusive = args[1];
        var valueBig = new Big(value);
        var minBig = new Big(min);
        if (valueBig.lt(minBig) || (isExclusive && valueBig.eq(minBig))) {
            return cb({
                KEY: isExclusive ? 'min_exclusive' : 'min',
                value: value,
                min: min,
                isExclusive: isExclusive
            });
        }
        cb();
    }
};
//# sourceMappingURL=min.js.map