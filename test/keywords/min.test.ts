import { runTest, TestCaseConfig } from '../runTest';

import _ from '../../src';

const cases: TestCaseConfig = {
  name: 'min',
  cases: [
    {
      schema: _.number.min(1),
      pass: [1, '1', '1.1', 1.1e2],
      fail: ['0', '0.1', 0.5]
    },
    {
      schema: _.number.min(1, true),
      pass: [1.1, '1.1', 1.1e2],
      fail: ['0', '0.1', 0.5, 1, '1']
    }
  ]
};
runTest(cases);
