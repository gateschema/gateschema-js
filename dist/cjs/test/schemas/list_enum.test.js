"use strict";
exports.__esModule = true;
var index_1 = require("../../src/index");
var index_2 = require("./index");
var testConfig = {
    name: 'list(enum)',
    schema: index_1["default"].list(index_1["default"]["enum"]({
        foo: 0,
        bar: 1
    })),
    pass: [
        {
            value: []
        },
        {
            value: [0]
        },
        {
            value: [1]
        },
        {
            value: [0, 1]
        }
    ],
    fail: [
        {
            value: 0,
            errKeyword: 'list'
        },
        {
            value: [2],
            errKeyword: 'enum'
        }
    ]
};
index_2["default"](testConfig);
