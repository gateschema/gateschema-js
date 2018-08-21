import { runTest, TestCaseConfig } from '../runTest';

import _ from '../../src';

const cases: TestCaseConfig = {
  name: 'string',
  cases: [
    {
      schema: _.string,
      pass: ['', '1', 'a'],
      fail: [undefined, null, true, 1, {}, []]
    }
  ]
};
runTest(cases);
