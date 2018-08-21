import _ from '../../src';

const name = 'allowAdditional';
test(name, () => {
  const schema = _.map({
    id: _.number,
    name: _.string
  });
  const value = {
    age: 18,
    id: 1,
    name: 'foo'
  };
  const schemaAllowAdditonal = _.map({
    id: _.number,
    name: _.string
  }).allowAdditional;

  const valueAllowAdditional = {
    age: 18,
    id: 1,
    name: 'foo'
  };

  schema.validate(value, { removeAdditional: true }, (err: any) => {
    expect(err).toBeFalsy();
    expect(value.age).toBeUndefined();
  });
  schemaAllowAdditonal.validate(
    valueAllowAdditional,
    { removeAdditional: true },
    (err: any) => {
      expect(err).toBeFalsy();
      expect(valueAllowAdditional.age).toBe(valueAllowAdditional.age);
    }
  );
});
