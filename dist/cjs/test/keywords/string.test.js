"use strict";
exports.__esModule = true;
var index_1 = require("./index");
var src_1 = require("../../src");
var cases = {
    name: 'string',
    cases: [
        {
            schema: src_1["default"].string,
            pass: ['', '1', 'a'],
            fail: [undefined, null, true, 1, {}, []]
        }
    ]
};
index_1.runTest(cases);
