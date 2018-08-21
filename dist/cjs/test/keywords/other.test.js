"use strict";
exports.__esModule = true;
var index_1 = require("./index");
var src_1 = require("../../src");
var cases = {
    name: 'other',
    cases: [
        {
            schema: src_1["default"].other('any'),
            pass: [true, false, 'any'],
            fail: []
        }
    ]
};
index_1.runTest(cases);
