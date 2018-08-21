"use strict";
exports.__esModule = true;
var index_1 = require("./index");
var src_1 = require("../../src");
var cases = {
    name: 'list',
    cases: [
        {
            schema: src_1["default"].list(src_1["default"].string),
            pass: [['a', 'b']],
            fail: [[1, 2]]
        },
        {
            schema: src_1["default"].list(src_1["default"].number),
            pass: [[1, 2]],
            fail: [['a', 'b']]
        }
    ]
};
index_1.runTest(cases);
