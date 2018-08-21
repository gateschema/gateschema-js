"use strict";
exports.__esModule = true;
var src_1 = require("../../src");
var name = 'allowAdditional';
test(name, function () {
    var schema = src_1["default"].map({
        id: src_1["default"].number,
        name: src_1["default"].string
    });
    var value = {
        age: 18,
        id: 1,
        name: 'foo'
    };
    var schemaAllowAdditonal = src_1["default"].map({
        id: src_1["default"].number,
        name: src_1["default"].string
    }).allowAdditional;
    var valueAllowAdditional = {
        age: 18,
        id: 1,
        name: 'foo'
    };
    schema.validate(value, { removeAdditional: true }, function (err) {
        expect(err).toBeFalsy();
        expect(value.age).toBeUndefined();
    });
    schemaAllowAdditonal.validate(valueAllowAdditional, { removeAdditional: true }, function (err) {
        expect(err).toBeFalsy();
        expect(valueAllowAdditional.age).toBe(valueAllowAdditional.age);
    });
});
