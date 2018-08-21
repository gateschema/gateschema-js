"use strict";
exports.__esModule = true;
var index_1 = require("./index");
var src_1 = require("../../src");
var cases = {
    name: 'pattern',
    cases: [
        {
            schema: src_1["default"].pattern(/^a\d+/),
            pass: ['a1', 'a123'],
            fail: ['a', 'b1']
        }
    ]
};
index_1.runTest(cases);
