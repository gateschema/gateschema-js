"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("../util");
exports.default = {
    isHighOrder: true,
    name: 'len',
    validator: function (value, _a, cb) {
        var path = _a.path, state = _a.state, args = _a.args;
        var type = state.types[path];
        var valueLength;
        if (!type) {
            return cb(new Error('missing type declaration'));
        }
        switch (type) {
            case 'string':
                valueLength = util_1.charCount(value);
                break;
            case 'list':
                valueLength = value.length;
                break;
            case 'binary':
                if (typeof value === 'string') {
                    valueLength = value.length;
                    if (valueLength > 0) {
                        var index = value.indexOf('=');
                        var padding = index > -1 ? valueLength - index : 0;
                        valueLength = (3 * valueLength) / 4 - padding;
                    }
                }
                else {
                    valueLength = value.byteLength;
                }
                break;
            default:
                return cb(new Error("can't use length constraint on type: " + type));
        }
        var err;
        var errType;
        var length;
        var minLength;
        var maxLength;
        var expected = args[0];
        if (Array.isArray(expected)) {
            minLength = expected[0], maxLength = expected[1];
            if (minLength != null && maxLength != null) {
                if (valueLength < minLength || valueLength > maxLength) {
                    err = true;
                    errType = 'range';
                }
            }
            else if (minLength != null) {
                if (valueLength < minLength) {
                    err = true;
                    errType = 'min';
                }
            }
            else if (maxLength != null) {
                if (valueLength > maxLength) {
                    err = true;
                    errType = 'max';
                }
            }
            else {
                return cb(new Error('missing minLength or maxLength'));
            }
        }
        else {
            length = expected;
            if (valueLength !== expected) {
                err = true;
                errType = 'match';
            }
        }
        if (err) {
            return cb({
                KEY: "length_" + type + "_" + errType,
                length: length,
                maxLength: maxLength,
                minLength: minLength,
                valueLength: valueLength
            });
        }
        cb();
    }
};
//# sourceMappingURL=len.js.map