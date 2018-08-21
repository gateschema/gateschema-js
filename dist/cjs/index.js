"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __importDefault(require("./alias/index"));
var index_2 = __importDefault(require("./keywords/index"));
var msgs_1 = __importDefault(require("./msgs"));
var index_3 = __importDefault(require("./protoProps/index"));
var schemaBase_1 = __importDefault(require("./schemaBase"));
var _ = schemaBase_1.default.extend({
    aliases: index_1.default,
    keywords: index_2.default,
    msgs: msgs_1.default
});
exports._ = _;
var r = _.extend({
    initConstraints: ['required']
});
exports.r = r;
var o = _.extend({
    initConstraints: ['optional']
});
exports.o = o;
Object.assign(schemaBase_1.default.prototype, index_3.default);
exports.default = _;
//# sourceMappingURL=index.js.map