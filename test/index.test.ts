import { _, o, r } from '../src/index';
import * as I from '../src/interface';
import * as util from './util';

// tslint:disable no-shadowed-variable
test('constructor: _.required.string', () => {
  const schema: I.GateSchemaBase = _.required.string;
  expect(schema.constraints).toBeInstanceOf(Array);
  expect(schema.constraints.length).toBe(2);
});

test('constructor: new _({constraints: ["required", "string"])', () => {
  const constraints = ['required', 'string'];
  const schema: I.GateSchemaBase = new _({ constraints });
  expect(schema.constraints).toBeInstanceOf(Array);
  expect(schema.constraints.length).toBe(2);
});

test('validate(value, {removeAdditional: true} cb)', () => {
  const schema: I.GateSchemaBase = _.map({
    id: _.string,
    name: _.string
  });
  const value = {
    age: 18,
    id: '1',
    name: 'foo'
  };

  schema.validate(value, { removeAdditional: true }, (err: any) => {
    expect(err).toBeFalsy();
    expect(value.age).toBeUndefined();
  });
});

test('validate(value, {removeAdditional: false} cb)', () => {
  const schema: I.GateSchemaBase = _.map({
    id: _.string,
    name: _.string
  });
  const value = {
    age: 18,
    id: util.genString(),
    name: util.genString()
  };

  schema.validate(value, { removeAdditional: true }, (err: any) => {
    expect(err).toBeFalsy();
    expect(value.age).toBe(value.age);
  });
});

test('validate: unknown keyword', () => {
  const constraints = ['required', 'unknown'];
  const schema: I.GateSchemaBase = new _({ constraints });
  schema.validate('value', (err: any) => {
    expect(err).toBeInstanceOf(Error);
  });
});

test('validate: skip unknown keyword', () => {
  const constraints = ['required', 'unknown'];

  const skips = ['unknown'];
  const schema: I.GateSchemaBase = new _({ constraints });
  schema.validate('value', { skips }, (err: any) => {
    expect(err).toBeFalsy();
  });
});

test('validate: skip async keyword', done => {
  const asyncKw: I.Keyword = {
    name: 'akw',
    isAsync: true,
    validator(value, ctx, cb) {
      setTimeout(() => {
        cb(true);
      }, 1000);
    }
  };

  const S = _.extend({ keywords: [asyncKw] });

  const schema = S.akw;

  schema.validate('any', (err: any) => {
    expect(err).toBeTruthy();
    schema.validate('any', { skipAsync: true }, (err: any) => {
      expect(err).toBeFalsy();
      done();
    });
  });
});

test('validate return promise', () => {
  const schema = _.required.string;
  expect(schema.validate(1)).resolves.toBeTruthy();
  expect(schema.validate('1')).resolves.toBeFalsy();
});

test('$get', () => {
  const schema: I.GateSchemaBase = _.required;
  schema.$get('/', (_: I.GateSchemaBase) => {
    return _.string;
  });
  schema.validate(util.genString(), (err: any) => {
    expect(err).toBeFalsy();
  });

  schema.validate(util.genNumber(), (err: any) => {
    expect(err).toBeTruthy();
  });

  const schemaOfMap: I.GateSchemaBase = _.required.map({
    id: _.required
  });
  schemaOfMap.$get('/id', (_: I.GateSchemaBase) => {
    return _.number;
  });
  schemaOfMap.validate({ id: util.genString() }, (err: any) => {
    expect(err).toBeTruthy();
  });

  schemaOfMap.validate({ id: util.genNumber() }, (err: any) => {
    expect(err).toBeFalsy();
  });

  schemaOfMap.$get('/name', (_: I.GateSchemaBase) => {
    expect(_).toBeUndefined();
  });

  const schemaOfSwitch: I.GateSchemaBase = _.map({
    info: _.switch('/name', [
      {
        case: _.number,
        schema: _.map({
          type: _.number
        })
      },
      {
        case: _.string,
        schema: _.map({
          type: _.string
        })
      }
    ]),
    name: _.required
  });

  schemaOfSwitch.$get('/info/type', { name: 1 }, (_: I.GateSchemaBase) => {
    return _.value(1);
  });
  schemaOfSwitch.validate({ name: 1, info: { type: 1 } }, (err: any) => {
    expect(err).toBeFalsy();
  });
  schemaOfSwitch.validate({ name: 1, info: { type: 2 } }, (err: any) => {
    expect(err).toBeTruthy();
  });

  const schemaOfSwitchS = new _({ constraints: schemaOfSwitch.toJSON() });
  schemaOfSwitchS.$get('/info/type', { name: 1 }, (_: I.GateSchemaBase) => {
    return _.value(1);
  });
  schemaOfSwitchS.validate({ name: 1, info: { type: 1 } }, (err: any) => {
    expect(err).toBeFalsy();
  });
  schemaOfSwitchS.validate({ name: 1, info: { type: 2 } }, (err: any) => {
    expect(err).toBeTruthy();
  });
});

test('$clone', () => {
  const schema = _.required.string;
  const cloneSchema = schema.$clone();
  expect(schema.toJSON()).toEqual(cloneSchema.toJSON());
});

test('$clone({pick: string[]})', () => {
  const schema = _.map({
    id: _.string,
    name: _.string
  }).switch('/id', [
    {
      case: _.value(1),
      schema: _.map({
        address: _.string,
        mobile: _.required.number
      })
    }
  ]);
  const cloneSchema = schema.$clone({ pick: ['id', 'mobile'] });
  const eqSchema = _.map({
    id: _.string
  }).switch('/id', [
    {
      case: _.value(1),
      schema: _.map({
        mobile: _.required.number
      })
    }
  ]);
  expect(cloneSchema.toJSON()).toEqual(eqSchema.toJSON());
});

test('$clone({omit: string[]})', () => {
  const schema = _.map({
    id: _.string,
    name: _.string
  }).switch('/id', [
    {
      case: _.value(1),
      schema: _.map({
        address: _.string,
        mobile: _.number
      })
    }
  ]);
  const cloneSchema = schema.$clone({ omit: ['name', 'address'] });
  const eqSchema = _.map({
    id: _.string
  }).switch('/id', [
    {
      case: _.value(1),
      schema: _.map({
        mobile: _.number
      })
    }
  ]);

  expect(cloneSchema.toJSON()).toEqual(eqSchema.toJSON());
});

test('$keys()', () => {
  const schema = _.map({
    id: _.string,
    name: _.string
  }).switch('/id', [
    {
      case: _.value(1),
      schema: _.map({
        address: _.string,
        mobile: _.number
      })
    }
  ]);
  const keys = ['id', 'name', 'address', 'mobile'];
  expect(schema.$keys()).toEqual(keys);
});

test('$msg()', () => {
  const msg = 'Please input your username';
  _.required.$msg(msg).validate(null, (err: any) => {
    expect(err.msg).toBe(msg);
  });

  const msgLength = 'password should at least contain 6 characters';
  _.required.string
    .length(6)
    .$msg(msgLength)
    .validate('abc12', (err: any) => {
      expect(err.msg).toBe(msgLength);
    });
});

test('_.addAlias', () => {
  const Schema = _.extend();
  Schema.addAlias({
    add() {
      return this.required.string;
    },
    name: 'rs'
  });

  expect(Schema.rs.toJSON()).toEqual(_.required.string.toJSON());
  expect(Schema.rs.number.rs.toJSON()).toEqual(
    _.required.string.number.required.string.toJSON()
  );
});

test('_.extend({alias: Alias[]})', () => {
  const Schema = _.extend({
    aliases: [
      {
        name: 'rs',
        add() {
          return this.required.string;
        }
      }
    ]
  });
  expect(Schema.rs.toJSON()).toEqual(_.required.string.toJSON());
});

test('r', () => {
  const schema = r.string;
  schema.validate(null, (err: any) => {
    expect(err).toBeTruthy();
    expect(err.keyword).toBe('required');
  });
});

test('o', () => {
  const schema = o.string;
  schema.validate(null, (err: any) => {
    expect(err).toBeFalsy();
  });
});
// tslint:enable no-shadowed-variable
