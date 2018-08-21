import _ from '../../src/index';
import testSchema from './index';

const testConfig = {
  name: 'list(enum)',
  schema: _.list(
    _.enum({
      foo: 0,
      bar: 1
    })
  ),
  pass: [
    {
      value: []
    },
    {
      value: [0]
    },
    {
      value: [1]
    },
    {
      value: [0, 1]
    }
  ],
  fail: [
    {
      value: 0,
      errKeyword: 'list'
    },
    {
      value: [2],
      errKeyword: 'enum'
    }
  ]
};

testSchema(testConfig);
