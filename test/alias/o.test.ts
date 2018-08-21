import { runTest, TestCaseConfig } from '../runTest';

import _ from '../../src';

const cases: TestCaseConfig = {
  name: 'o',
  cases: [
    {
      schema: _.o.string,
      pass: [undefined, null, '', '0'],
      fail: [1, false, true, {}]
    }
  ]
};
runTest(cases);
