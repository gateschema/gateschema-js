import { runTest, TestCaseConfig } from './index';

import _ from '../../src/index';

const cases: TestCaseConfig = {
  name: 'value',
  cases: [
    {
      schema: _.value(1),
      pass: [1],
      fail: ['1', true, 0]
    }
  ]
};
runTest(cases);
