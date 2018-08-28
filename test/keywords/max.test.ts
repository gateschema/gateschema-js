import { runTest, TestCaseConfig } from '../runTest';

import _ from '../../src';

const cases: TestCaseConfig = {
  name: 'max',
  cases: [
    {
      schema: _.number.max(2),
      pass: [-1, '-1', 0, 1, '1', '1.1', 2, '2'],
      fail: [2.2, '2.3', 3, '3', 100, '100']
    },
    {
      schema: _.number.max(2, true),
      pass: [-1, '-1', 0, 1, '1', '1.1'],
      fail: [2, '2', 2.2, '2.3', 3, '3', 100, '100']
    }
  ]
};
runTest(cases);
