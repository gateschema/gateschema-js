"use strict";
exports.__esModule = true;
var index_1 = require("./alias/index");
var index_2 = require("./keywords/index");
var msgs_1 = require("./msgs");
var index_3 = require("./protoProps/index");
var schemaBase_1 = require("./schemaBase");
var _ = schemaBase_1["default"].extend({
    aliases: index_1["default"],
    keywords: index_2["default"],
    msgs: msgs_1["default"]
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
Object.assign(schemaBase_1["default"].prototype, index_3["default"]);
exports["default"] = _;
