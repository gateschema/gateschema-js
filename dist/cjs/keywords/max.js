"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var big_js_1 = __importDefault(require("big.js"));
exports.default = {
    isHighOrder: true,
    name: 'max',
    validator: function (value, _a, cb) {
        var path = _a.path, state = _a.state, args = _a.args;
        var max = args[0], isExclusive = args[1];
        var valueBig = new big_js_1.default(value);
        var maxBig = new big_js_1.default(max);
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