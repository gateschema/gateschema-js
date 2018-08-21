"use strict";
exports.__esModule = true;
var index_1 = require("./index");
var index_2 = require("../../src/index");
var cases = {
    name: 'not',
    cases: [
        {
            schema: index_2["default"].map({
                password: index_2["default"].string,
                repassword: index_2["default"].not(index_2["default"].eqTo('./password'))
            }),
            pass: [
                {
                    password: '123456',
                    repassword: '12'
                }
            ],
            fail: [
                {
                    password: '123456',
                    repassword: '123456'
                }
            ]
        }
    ]
};
index_1.runTest(cases);
