import { runTest, TestCaseConfig } from '../runTest';

import _ from '../../src';

const cases: TestCaseConfig = {
  name: 'required',
  cases: [
    {
      schema: _.required,
      pass: ['', false, 0, '0', {}],
      fail: [undefined, null]
    }
  ]
};
runTest(cases);
