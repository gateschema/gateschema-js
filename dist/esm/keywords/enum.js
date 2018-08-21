export default {
    isHighOrder: true,
    name: 'enum',
    validator: function (receivedValue, _a, cb) {
        var args = _a.args;
        var _b = args[0], expectedValues = _b === void 0 ? {} : _b;
        for (var key in expectedValues) {
            if (expectedValues[key] === receivedValue) {
                return cb();
            }
        }
        var keys = Object.keys(expectedValues);
        var values = keys.map(function (key) { return expectedValues[key]; });
        cb({
            keys: JSON.stringify(keys),
            values: JSON.stringify(values)
        });
    }
};
//# sourceMappingURL=enum.js.map