import { runTest, TestCaseConfig } from './index';

import _ from '../../src';

const cases: TestCaseConfig = {
  name: 'other',
  cases: [
    {
      schema: _.other('any'),
      pass: [true, false, 'any'],
      fail: []
    }
  ]
};
runTest(cases);
