"use strict";
exports.__esModule = true;
var index_1 = require("./index");
var src_1 = require("../../src");
var cases = {
    name: 'length',
    cases: [
        {
            schema: src_1["default"].string.length(2),
            pass: ['ab'],
            fail: ['a', 'abc']
        },
        {
            schema: src_1["default"].string.length([2]),
            pass: ['ab', 'abc'],
            fail: ['a', '']
        },
        {
            schema: src_1["default"].string.length([, 2]),
            pass: ['ab', 'a'],
            fail: ['abc']
        },
        {
            schema: src_1["default"].string.length([1, 2]),
            pass: ['ab', 'a'],
            fail: ['', 'abc']
        },
        {
            schema: src_1["default"].list(src_1["default"].number).length(3),
            pass: [[1, 2, 3]],
            fail: [[1, 2], [1, 2, 3, 4]]
        },
        {
            schema: src_1["default"].list(src_1["default"].number).length([3]),
            pass: [[1, 2, 3], [1, 2, 3, 4]],
            fail: [[1, 2], [1]]
        },
        {
            schema: src_1["default"].list(src_1["default"].number).length([, 3]),
            pass: [[1, 2], [1, 2, 3]],
            fail: [[1, 2, 3, 4]]
        },
        {
            schema: src_1["default"].list(src_1["default"].number).length([2, 3]),
            pass: [[1, 2], [1, 2, 3]],
            fail: [[1], [1, 2, 3, 4]]
        },
        {
            schema: src_1["default"].binary.length(2),
            pass: [
                new ArrayBuffer(2),
                // btoa(String.fromCharCode.apply(null, new Uint8Array(2)))
                'AAA='
            ],
            fail: [new ArrayBuffer(1), 'AA==', new ArrayBuffer(3), 'AAAA']
        },
        {
            schema: src_1["default"].binary.length([2]),
            pass: [new ArrayBuffer(2), 'AAA=', new ArrayBuffer(3), 'AAAA'],
            fail: [new ArrayBuffer(1), 'AA==']
        },
        {
            schema: src_1["default"].binary.length([, 2]),
            pass: [new ArrayBuffer(1), 'AA==', new ArrayBuffer(2), 'AAA='],
            fail: [new ArrayBuffer(3), 'AAAA']
        },
        {
            schema: src_1["default"].binary.length([1, 2]),
            pass: [new ArrayBuffer(1), 'AA==', new ArrayBuffer(2), 'AAA='],
            fail: ['', new ArrayBuffer(3), 'AAAA']
        }
    ]
};
index_1.runTest(cases);
