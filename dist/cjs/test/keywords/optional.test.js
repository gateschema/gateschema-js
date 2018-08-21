"use strict";
exports.__esModule = true;
var index_1 = require("./index");
var src_1 = require("../../src");
var cases = {
    name: 'optional',
    cases: [
        {
            schema: src_1["default"].optional.string,
            pass: [undefined, null, '', '0'],
            fail: [1, false, true, {}]
        }
    ]
};
index_1.runTest(cases);
