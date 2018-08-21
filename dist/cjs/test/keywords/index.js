"use strict";
exports.__esModule = true;
var msgs_1 = require("../../src/msgs");
function runTest(testConfig) {
    testConfig.cases.forEach(function (_a) {
        var schema = _a.schema, pass = _a.pass, fail = _a.fail;
        pass.forEach(function (item) {
            test(testConfig.name + " pass: " + JSON.stringify(item), function () {
                schema.validate(item, function (err) {
                    expect(err).toBeFalsy();
                });
            });
        });
        fail.forEach(function (item, index) {
            test(testConfig.name + " fail: " + JSON.stringify(item), function () {
                schema.validate(item, function (err) {
                    expect(err).toBeTruthy();
                    expect(msgs_1["default"]).toHaveProperty(err.msgParams.KEY);
                });
            });
        });
    });
}
exports.runTest = runTest;
