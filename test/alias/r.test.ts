import { runTest, TestCaseConfig } from '../runTest';

import _ from '../../src';

const cases: TestCaseConfig = {
  name: 'r',
  cases: [
    {
      schema: _.r,
      pass: ['', false, 0, '0', {}],
      fail: [undefined, null]
    }
  ]
};
runTest(cases);
