"use strict";
exports.__esModule = true;
var index_1 = require("./index");
var index_2 = require("../../src/index");
var cases = {
    name: 'value',
    cases: [
        {
            schema: index_2["default"].value(1),
            pass: [1],
            fail: ['1', true, 0]
        }
    ]
};
index_1.runTest(cases);
