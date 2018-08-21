import { runTest, TestCaseConfig } from '../runTest';

import _ from '../../src/index';

const cases: TestCaseConfig = {
  name: 'boolean',
  cases: [
    {
      schema: _.boolean,
      pass: [true, false],
      fail: [0, '', 1, {}]
    }
  ]
};
runTest(cases);
