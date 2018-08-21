"use strict";
exports.__esModule = true;
var index_1 = require("./index");
var index_2 = require("../../src/index");
var cases = {
    name: 'enum',
    cases: [
        {
            schema: index_2["default"]["enum"]({
                foo: 0,
                bar: 1
            }),
            pass: [0, 1],
            fail: [2, '0', '1']
        }
    ]
};
index_1.runTest(cases);
