"use strict";
exports.__esModule = true;
var index_1 = require("./index");
var src_1 = require("../../src");
var cases = {
    name: 'notEmpty',
    cases: [
        {
            schema: src_1["default"].notEmpty,
            pass: [
                {
                    foo: 'bar'
                },
                [1],
                '1',
                1
            ],
            fail: [{}, [], '', 0, undefined, null]
        }
    ]
};
index_1.runTest(cases);
