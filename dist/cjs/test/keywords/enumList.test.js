"use strict";
exports.__esModule = true;
var index_1 = require("./index");
var index_2 = require("../../src/index");
var cases = {
    name: 'enumList',
    cases: [
        {
            schema: index_2["default"].enumList({
                foo: 0,
                bar: 1
            }),
            pass: [[0], [1], [0, 1]],
            fail: [1, [2], ['0'], ['1'], ['1', 1]]
        }
    ]
};
index_1.runTest(cases);
