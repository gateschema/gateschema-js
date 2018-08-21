"use strict";
exports.__esModule = true;
var index_1 = require("./index");
var src_1 = require("../../src");
var cases = {
    name: 'binary',
    cases: [
        {
            schema: src_1["default"].binary,
            pass: [
                '',
                new ArrayBuffer(0),
                'aGVsbG8=',
                new ArrayBuffer(8),
                new Int8Array(8).buffer
            ],
            fail: ['hello', [8]]
        }
    ]
};
index_1.runTest(cases);
