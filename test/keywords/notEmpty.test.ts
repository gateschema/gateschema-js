import { runTest, TestCaseConfig } from '../runTest';

import _ from '../../src';

const cases: TestCaseConfig = {
  name: 'notEmpty',
  cases: [
    {
      schema: _.notEmpty,
      pass: [
        {
          foo: 'bar'
        },
        [1],
        '1',
        1
      ],
      fail: [{}, [], '', 0, undefined, null]
    }
  ]
};
runTest(cases);
