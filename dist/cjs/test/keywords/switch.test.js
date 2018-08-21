"use strict";
exports.__esModule = true;
var index_1 = require("./index");
var src_1 = require("../../src");
// tslint:disable object-literal-sort-keys
var cases = {
    name: 'switch',
    cases: [
        {
            schema: src_1["default"].map({
                registerType: src_1["default"]["enum"]({
                    email: 0,
                    mobile: 1
                })
            })["switch"]('/registerType', [
                {
                    "case": src_1["default"].value(0),
                    schema: src_1["default"].map({
                        email: src_1["default"].required.string
                    })
                },
                {
                    "case": src_1["default"].value(1),
                    schema: src_1["default"].map({
                        mobile: src_1["default"].required.string
                    })
                }
            ]),
            pass: [
                {
                    registerType: 0,
                    email: 'foo@bar.com'
                },
                {
                    registerType: 1,
                    mobile: '123456'
                }
            ],
            fail: [
                {
                    registerType: 1,
                    email: 'foo@bar.com'
                },
                {
                    registerType: 2,
                    mobile: '123456'
                },
                {
                    registerType: 3
                }
            ]
        },
        {
            schema: src_1["default"].map({
                id: src_1["default"].string,
                address: src_1["default"].map({
                    contact: src_1["default"].optional.string,
                    code: src_1["default"]["switch"]('/address/contact', [
                        {
                            "case": src_1["default"].required,
                            schema: src_1["default"].required.number
                        },
                        {
                            "case": src_1["default"].any,
                            schema: src_1["default"].any
                        }
                    ])
                })
            }),
            pass: [
                {
                    id: '1',
                    address: {
                        contact: 'hello',
                        code: 123
                    }
                },
                {
                    id: '1',
                    address: {}
                }
            ],
            fail: [
                {
                    id: '1',
                    address: {
                        contact: 'hello'
                    }
                },
                {
                    id: '1',
                    address: {
                        contact: 'hello',
                        code: 'abc'
                    }
                }
            ]
        },
        {
            schema: src_1["default"].map({
                id: src_1["default"].string
            })["switch"]('/id', [
                {
                    "case": src_1["default"].value('1'),
                    schema: src_1["default"].map({
                        name: src_1["default"].string
                    })
                },
                {
                    "case": src_1["default"].any,
                    schema: src_1["default"].map({
                        name: src_1["default"].number
                    })
                }
            ]),
            pass: [
                {
                    id: '1',
                    name: 'a'
                },
                {
                    id: '2',
                    name: 1
                }
            ],
            fail: [
                {
                    id: '1',
                    name: 1
                },
                {
                    id: '2',
                    name: 'a'
                }
            ]
        },
        {
            schema: src_1["default"].map({
                name: src_1["default"].any,
                address: src_1["default"].map({
                    mobile: src_1["default"]["switch"]('../name', [
                        {
                            "case": src_1["default"].string,
                            schema: src_1["default"].string
                        }
                    ])
                }),
                point: src_1["default"]["switch"]('./name', [
                    {
                        "case": src_1["default"].string,
                        schema: src_1["default"].string
                    }
                ])
            }),
            pass: [
                {
                    name: '1',
                    address: {
                        mobile: '2'
                    },
                    point: '3'
                }
            ],
            fail: [
                {
                    name: '1',
                    address: {
                        mobile: 2
                    },
                    point: 2
                }
            ]
        }
    ]
};
index_1.runTest(cases);
