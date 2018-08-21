"use strict";
exports.__esModule = true;
var index_1 = require("./index");
var index_2 = require("../../src/index");
var cases = {
    name: 'cond',
    cases: [
        {
            schema: index_2["default"].map({
                id: index_2["default"].optional.string,
                name: index_2["default"].cond('/id', index_2["default"].required.string, index_2["default"].optional)
            }),
            pass: [
                {
                    id: '1',
                    name: '2'
                },
                {}
            ],
            fail: [
                {
                    id: '1'
                }
            ]
        },
        {
            schema: index_2["default"].map({
                id: index_2["default"].optional.string,
                name: index_2["default"].cond('/id', index_2["default"].required.string)
            }),
            pass: [
                {
                    id: '1',
                    name: '2'
                },
                {
                    name: 1 // any
                },
                {}
            ],
            fail: [
                {
                    id: '1'
                }
            ]
        }
    ]
};
index_1.runTest(cases);
