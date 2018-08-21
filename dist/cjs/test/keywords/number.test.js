"use strict";
exports.__esModule = true;
var index_1 = require("./index");
var src_1 = require("../../src");
var cases = {
    name: 'number',
    cases: [
        {
            schema: src_1["default"].number,
            pass: [0, 1, '0', '1', '1.1', 1.1e2, '1.1e2'],
            fail: [undefined, null, true, {}, []]
        }
    ]
};
index_1.runTest(cases);
