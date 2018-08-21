import { runTest, TestCaseConfig } from '../runTest';

import _ from '../../src/index';

const cases: TestCaseConfig = {
  name: 'bool',
  cases: [
    {
      schema: _.bool,
      pass: [true, false],
      fail: [0, '', 1, {}]
    }
  ]
};
runTest(cases);
