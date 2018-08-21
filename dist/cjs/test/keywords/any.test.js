"use strict";
exports.__esModule = true;
var index_1 = require("./index");
var index_2 = require("../../src/index");
var cases = {
    name: 'any',
    cases: [
        {
            schema: index_2["default"].any,
            pass: [true, false, 'any'],
            fail: []
        }
    ]
};
index_1.runTest(cases);
