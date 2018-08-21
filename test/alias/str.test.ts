import { runTest, TestCaseConfig } from '../runTest';

import _ from '../../src';

const cases: TestCaseConfig = {
  name: 'str',
  cases: [
    {
      schema: _.str,
      pass: ['', '1', 'a'],
      fail: [undefined, null, true, 1, {}, []]
    }
  ]
};
runTest(cases);
