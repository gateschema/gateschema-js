"use strict";
exports.__esModule = true;
var index_1 = require("./index");
var index_2 = require("../../src/index");
var cases = {
    name: 'boolean',
    cases: [
        {
            schema: index_2["default"].boolean,
            pass: [true, false],
            fail: [0, '', 1, {}]
        }
    ]
};
index_1.runTest(cases);
