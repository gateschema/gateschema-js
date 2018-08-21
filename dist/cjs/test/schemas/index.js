"use strict";
exports.__esModule = true;
function testSchema(testConfig) {
    var name = testConfig.name;
    var schema = testConfig.schema;
    var pass = testConfig.pass || [];
    var fail = testConfig.fail || [];
    pass.forEach(function (item, index) {
        test(name + " pass: " + index, function () {
            schema.validate(item.value, function (err) {
                expect(err).toBeFalsy();
            });
        });
    });
    fail.forEach(function (item, index) {
        test(name + " fail: " + index, function () {
            schema.validate(item.value, function (err) {
                expect(err).toBeTruthy();
                if (item.errKeyword) {
                    expect(err.keyword).toBe(item.errKeyword);
                }
            });
        });
    });
}
exports["default"] = testSchema;
