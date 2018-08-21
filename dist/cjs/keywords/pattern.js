"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    isHighOrder: true,
    name: 'pattern',
    add: function () {
        var _this = this;
        return function (pattern, flags) {
            var constraint = { keyword: 'pattern' };
            if (pattern instanceof RegExp) {
                constraint.args = [pattern.source, pattern.flags];
            }
            else if (typeof pattern === 'string') {
                constraint.args = [pattern, flags];
            }
            else {
                throw new Error('pattern should be an RegExp instance or RegExp source string');
            }
            _this.add(constraint);
            return _this;
        };
    },
    validator: function (value, _a, cb) {
        var args = _a.args;
        var reg;
        try {
            reg = RegExp.apply(null, args);
        }
        catch (e) {
            return cb(new Error('invalid pattern'));
        }
        return cb(!reg.test(value));
    }
};
//# sourceMappingURL=pattern.js.map