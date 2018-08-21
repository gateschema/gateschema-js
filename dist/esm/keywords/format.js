import validators from './format_validator';
export default {
    isHighOrder: true,
    name: 'format',
    validator: function (value, _a, cb) {
        var args = _a.args;
        var format = args[0];
        var validator = validators[format];
        if (validator) {
            if (!validator(value)) {
                return cb({
                    format: format
                });
            }
            return cb();
        }
        return cb(new Error("no validator for format: " + format));
    }
};
//# sourceMappingURL=format.js.map