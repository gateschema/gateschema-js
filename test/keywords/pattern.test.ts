import { runTest, TestCaseConfig } from './index';

import _ from '../../src';

const cases: TestCaseConfig = {
  name: 'pattern',
  cases: [
    {
      schema: _.pattern(/^a\d+/),
      pass: ['a1', 'a123'],
      fail: ['a', 'b1']
    }
  ]
};
runTest(cases);
