"use strict";
exports.__esModule = true;
var index_1 = require("../src/index");
var util = require("./util");
// tslint:disable no-shadowed-variable
test('constructor: _.required.string', function () {
    var schema = index_1._.required.string;
    expect(schema.constraints).toBeInstanceOf(Array);
    expect(schema.constraints.length).toBe(2);
});
test('constructor: new _({constraints: ["required", "string"])', function () {
    var constraints = ['required', 'string'];
    var schema = new index_1._({ constraints: constraints });
    expect(schema.constraints).toBeInstanceOf(Array);
    expect(schema.constraints.length).toBe(2);
});
test('validate(value, {removeAdditional: true} cb)', function () {
    var schema = index_1._.map({
        id: index_1._.string,
        name: index_1._.string
    });
    var value = {
        age: 18,
        id: '1',
        name: 'foo'
    };
    schema.validate(value, { removeAdditional: true }, function (err) {
        expect(err).toBeFalsy();
        expect(value.age).toBeUndefined();
    });
});
test('validate(value, {removeAdditional: false} cb)', function () {
    var schema = index_1._.map({
        id: index_1._.string,
        name: index_1._.string
    });
    var value = {
        age: 18,
        id: util.genString(),
        name: util.genString()
    };
    schema.validate(value, { removeAdditional: true }, function (err) {
        expect(err).toBeFalsy();
        expect(value.age).toBe(value.age);
    });
});
test('validate: unknown keyword', function () {
    var constraints = ['required', 'unknown'];
    var schema = new index_1._({ constraints: constraints });
    schema.validate('value', function (err) {
        expect(err).toBeInstanceOf(Error);
    });
});
test('validate: skip unknown keyword', function () {
    var constraints = ['required', 'unknown'];
    var skips = ['unknown'];
    var schema = new index_1._({ constraints: constraints });
    schema.validate('value', { skips: skips }, function (err) {
        expect(err).toBeFalsy();
    });
});
test('validate: skip async keyword', function (done) {
    var asyncKw = {
        name: 'akw',
        isAsync: true,
        validator: function (value, ctx, cb) {
            setTimeout(function () {
                cb(true);
            }, 1000);
        }
    };
    var S = index_1._.extend({ keywords: [asyncKw] });
    var schema = S.akw;
    schema.validate('any', function (err) {
        expect(err).toBeTruthy();
        schema.validate('any', { skipAsync: true }, function (err) {
            expect(err).toBeFalsy();
            done();
        });
    });
});
test('validate return promise', function () {
    var schema = index_1._.required.string;
    expect(schema.validate(1)).resolves.toBeTruthy();
    expect(schema.validate('1')).resolves.toBeFalsy();
});
test('$get', function () {
    var schema = index_1._.required;
    schema.$get('/', function (_) {
        return _.string;
    });
    schema.validate(util.genString(), function (err) {
        expect(err).toBeFalsy();
    });
    schema.validate(util.genNumber(), function (err) {
        expect(err).toBeTruthy();
    });
    var schemaOfMap = index_1._.required.map({
        id: index_1._.required
    });
    schemaOfMap.$get('/id', function (_) {
        return _.number;
    });
    schemaOfMap.validate({ id: util.genString() }, function (err) {
        expect(err).toBeTruthy();
    });
    schemaOfMap.validate({ id: util.genNumber() }, function (err) {
        expect(err).toBeFalsy();
    });
    schemaOfMap.$get('/name', function (_) {
        expect(_).toBeUndefined();
    });
    var schemaOfSwitch = index_1._.map({
        info: index_1._["switch"]('/name', [
            {
                "case": index_1._.number,
                schema: index_1._.map({
                    type: index_1._.number
                })
            },
            {
                "case": index_1._.string,
                schema: index_1._.map({
                    type: index_1._.string
                })
            }
        ]),
        name: index_1._.required
    });
    schemaOfSwitch.$get('/info/type', { name: 1 }, function (_) {
        return _.value(1);
    });
    schemaOfSwitch.validate({ name: 1, info: { type: 1 } }, function (err) {
        expect(err).toBeFalsy();
    });
    schemaOfSwitch.validate({ name: 1, info: { type: 2 } }, function (err) {
        expect(err).toBeTruthy();
    });
    var schemaOfSwitchS = new index_1._({ constraints: schemaOfSwitch.toJSON() });
    schemaOfSwitchS.$get('/info/type', { name: 1 }, function (_) {
        return _.value(1);
    });
    schemaOfSwitchS.validate({ name: 1, info: { type: 1 } }, function (err) {
        expect(err).toBeFalsy();
    });
    schemaOfSwitchS.validate({ name: 1, info: { type: 2 } }, function (err) {
        expect(err).toBeTruthy();
    });
});
test('$clone', function () {
    var schema = index_1._.required.string;
    var cloneSchema = schema.$clone();
    expect(schema.toJSON()).toEqual(cloneSchema.toJSON());
});
test('$clone({pick: string[]})', function () {
    var schema = index_1._.map({
        id: index_1._.string,
        name: index_1._.string
    })["switch"]('/id', [
        {
            "case": index_1._.value(1),
            schema: index_1._.map({
                address: index_1._.string,
                mobile: index_1._.required.number
            })
        }
    ]);
    var cloneSchema = schema.$clone({ pick: ['id', 'mobile'] });
    var eqSchema = index_1._.map({
        id: index_1._.string
    })["switch"]('/id', [
        {
            "case": index_1._.value(1),
            schema: index_1._.map({
                mobile: index_1._.required.number
            })
        }
    ]);
    expect(cloneSchema.toJSON()).toEqual(eqSchema.toJSON());
});
test('$clone({omit: string[]})', function () {
    var schema = index_1._.map({
        id: index_1._.string,
        name: index_1._.string
    })["switch"]('/id', [
        {
            "case": index_1._.value(1),
            schema: index_1._.map({
                address: index_1._.string,
                mobile: index_1._.number
            })
        }
    ]);
    var cloneSchema = schema.$clone({ omit: ['name', 'address'] });
    var eqSchema = index_1._.map({
        id: index_1._.string
    })["switch"]('/id', [
        {
            "case": index_1._.value(1),
            schema: index_1._.map({
                mobile: index_1._.number
            })
        }
    ]);
    expect(cloneSchema.toJSON()).toEqual(eqSchema.toJSON());
});
test('$keys()', function () {
    var schema = index_1._.map({
        id: index_1._.string,
        name: index_1._.string
    })["switch"]('/id', [
        {
            "case": index_1._.value(1),
            schema: index_1._.map({
                address: index_1._.string,
                mobile: index_1._.number
            })
        }
    ]);
    var keys = ['id', 'name', 'address', 'mobile'];
    expect(schema.$keys()).toEqual(keys);
});
test('$msg()', function () {
    var msg = 'Please input your username';
    index_1._.required.$msg(msg).validate(null, function (err) {
        expect(err.msg).toBe(msg);
    });
    var msgLength = 'password should at least contain 6 characters';
    index_1._.required.string
        .length(6)
        .$msg(msgLength)
        .validate('abc12', function (err) {
        expect(err.msg).toBe(msgLength);
    });
});
test('_.addAlias', function () {
    var Schema = index_1._.extend();
    Schema.addAlias({
        add: function () {
            return this.required.string;
        },
        name: 'rs'
    });
    expect(Schema.rs.toJSON()).toEqual(index_1._.required.string.toJSON());
    expect(Schema.rs.number.rs.toJSON()).toEqual(index_1._.required.string.number.required.string.toJSON());
});
test('_.extend({alias: Alias[]})', function () {
    var Schema = index_1._.extend({
        aliases: [
            {
                name: 'rs',
                add: function () {
                    return this.required.string;
                }
            }
        ]
    });
    expect(Schema.rs.toJSON()).toEqual(index_1._.required.string.toJSON());
});
test('r', function () {
    var schema = index_1.r.string;
    schema.validate(null, function (err) {
        expect(err).toBeTruthy();
        expect(err.keyword).toBe('required');
    });
});
test('o', function () {
    var schema = index_1.o.string;
    schema.validate(null, function (err) {
        expect(err).toBeFalsy();
    });
});
// tslint:enable no-shadowed-variable
