"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var clone_1 = __importDefault(require("./clone"));
var get_1 = __importDefault(require("./get"));
var keys_1 = __importDefault(require("./keys"));
var msg_1 = __importDefault(require("./msg"));
exports.default = {
    $clone: clone_1.default,
    $keys: keys_1.default,
    $msg: msg_1.default,
    $get: get_1.default
};
//# sourceMappingURL=index.js.map