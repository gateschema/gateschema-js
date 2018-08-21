"use strict";
exports.__esModule = true;
var index_1 = require("./index");
var index_2 = require("../../src/index");
var cases = {
    name: 'format',
    cases: [
        {
            schema: index_2["default"].format('date'),
            pass: ['2018-07-26'],
            fail: ['2018/07/26']
        },
        {
            schema: index_2["default"].format('date-time'),
            pass: [
                '1990-12-31T15:59:59+02:00',
                '1990-12-31T15:59:59-08:00',
                '2017-07-21T17:32:28Z'
            ],
            fail: ['1990-12-31T15:59:59']
        },
        {
            schema: index_2["default"].format('hostname'),
            pass: ['github.com', 'a-n-y.sub.123.domain', 'localhost', '8.8.8.8'],
            fail: ['https://github.com', 'github.com:443', '8.8.8.8/24']
        },
        {
            schema: index_2["default"].format('uri'),
            pass: [
                'https://github.com',
                'https://github.com/gateschema',
                'https://github.com:443/gateschema?query=any',
                'schema://path:port?query'
            ],
            fail: ['noschema/name:port/path', 'https://github.com space']
        },
        {
            schema: index_2["default"].format('url'),
            pass: [
                'ftp://github.com',
                'http://github.com/gateschema',
                'https://github.com:443/gateschema?query=any'
            ],
            fail: ['tcp://name:port/path', '/path', 'https://github.com space']
        },
        {
            schema: index_2["default"].format('email'),
            pass: [
                'test@github.com',
                'test@localhost',
                '123@github.com',
                't12@github.com'
            ],
            fail: ['github.com', '@github.com', 'test@']
        },
        {
            schema: index_2["default"].format('ipv4'),
            pass: ['8.8.8.8', '192.168.1.1'],
            fail: ['192.168.1.1/24', 'github.com', 'http://192.168.2.1']
        },
        {
            schema: index_2["default"].format('ipv6'),
            pass: [
                '2001:0db8:0000:0000:0000:ff00:0042:1234',
                '2001:db8:0:0:0:ff00:42:5678',
                '2001:db8::ff00:42:8765'
            ],
            fail: [
                'g:0db8:0000:0000:0000:ff00:0042:8329',
                '-1:0db8:0000:0000:0000:ff00:0042:8329',
                '2001:db8:ff00:42:8329'
            ]
        }
    ]
};
index_1.runTest(cases);
