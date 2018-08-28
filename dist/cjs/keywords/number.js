"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var big_js_1 = __importDefault(require("big.js"));
exports.default = {
    name: 'number',
    validator: function (value, _a, cb) {
        var path = _a.path, state = _a.state;
        state.types[path] = 'number';
        try {
            new big_js_1.default(value);
        }
        catch (e) {
            return cb(true);
        }
        cb();
    }
};
//# sourceMappingURL=number.js.map