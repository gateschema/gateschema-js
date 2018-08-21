export default {
    name: 'unique',
    validator: function (values, ctx, cb) {
        var uniqueValues = [];
        for (var i = 0, length = values.length; i < length; i++) {
            var value = values[i];
            if (uniqueValues.indexOf(value) === -1) {
                uniqueValues.push(value);
                continue;
            }
            return cb(true);
        }
        cb();
    }
};
//# sourceMappingURL=unique.js.map