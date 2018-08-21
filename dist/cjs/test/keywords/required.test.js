"use strict";
exports.__esModule = true;
var index_1 = require("./index");
var src_1 = require("../../src");
var cases = {
    name: 'required',
    cases: [
        {
            schema: src_1["default"].required,
            pass: ['', false, 0, '0', {}],
            fail: [undefined, null]
        }
    ]
};
index_1.runTest(cases);
