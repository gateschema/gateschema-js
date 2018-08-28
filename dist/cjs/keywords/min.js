"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var big_js_1 = __importDefault(require("big.js"));
exports.default = {
    isHighOrder: true,
    name: 'min',
    validator: function (value, _a, cb) {
        var path = _a.path, state = _a.state, args = _a.args;
        var min = args[0], isExclusive = args[1];
        var valueBig = new big_js_1.default(value);
        var minBig = new big_js_1.default(min);
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