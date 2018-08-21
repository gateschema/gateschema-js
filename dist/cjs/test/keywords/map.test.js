"use strict";
exports.__esModule = true;
var index_1 = require("./index");
var src_1 = require("../../src");
var cases = {
    name: 'map',
    cases: [
        {
            schema: src_1["default"].map({
                id: src_1["default"].string
            }),
            pass: [
                {
                    id: '1'
                }
            ],
            fail: [
                true,
                1,
                {
                    id: 1
                }
            ]
        }
    ]
};
index_1.runTest(cases);
