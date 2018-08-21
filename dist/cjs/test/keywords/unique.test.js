"use strict";
exports.__esModule = true;
var index_1 = require("./index");
var src_1 = require("../../src");
var cases = {
    name: 'unique',
    cases: [
        {
            schema: src_1["default"].unique,
            pass: [[1, 2, 3], ['1', '2', '3']],
            fail: [[1, 1, 2], ['1', '2', '2']]
        }
    ]
};
index_1.runTest(cases);
