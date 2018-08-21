import { runTest, TestCaseConfig } from './index';

import _ from '../../src';

const cases: TestCaseConfig = {
  name: 'unique',
  cases: [
    {
      schema: _.unique,
      pass: [[1, 2, 3], ['1', '2', '3']],
      fail: [[1, 1, 2], ['1', '2', '2']]
    }
  ]
};
runTest(cases);
