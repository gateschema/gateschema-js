"use strict";
exports.__esModule = true;
var index_1 = require("./index");
var src_1 = require("../../src");
var cases = {
    name: 'oneOf',
    cases: [
        {
            schema: src_1["default"].oneOf([src_1["default"].string, src_1["default"].number]),
            pass: ['1', 0],
            fail: [undefined, null, true, {}, []]
        }
    ]
};
index_1.runTest(cases);
