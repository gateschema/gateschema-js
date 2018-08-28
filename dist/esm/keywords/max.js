import Big from 'big.js';
export default {
    isHighOrder: true,
    name: 'max',
    validator: function (value, _a, cb) {
        var path = _a.path, state = _a.state, args = _a.args;
        var max = args[0], isExclusive = args[1];
        var valueBig = new Big(value);
        var maxBig = new Big(max);
        if (valueBig.gt(maxBig) || (isExclusive && valueBig.eq(maxBig))) {
            return cb({
                KEY: isExclusive ? 'max_exclusive' : 'max',
                value: value,
                max: max,
                isExclusive: isExclusive
            });
        }
        cb();
    }
};
//# sourceMappingURL=max.js.map