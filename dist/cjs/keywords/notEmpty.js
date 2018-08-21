"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("../util");
exports.default = {
    name: 'notEmpty',
    validator: function (value, ctx, cb) {
        var type = typeof value;
        switch (true) {
            case type === 'number':
                cb(value === 0);
                break;
            case type === 'string':
                cb(value === '');
                break;
            case Array.isArray(value):
                cb(value.length === 0);
                break;
            case util_1.isObject(value):
                cb(Object.keys(value).length === 0);
                break;
            default:
                cb(value == null);
        }
    }
};
//# sourceMappingURL=notEmpty.js.map