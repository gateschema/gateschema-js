import { runTest, TestCaseConfig } from './index';

import _ from '../../src/index';

const cases: TestCaseConfig = {
  name: 'any',
  cases: [
    {
      schema: _.any,
      pass: [true, false, 'any'],
      fail: []
    }
  ]
};
runTest(cases);
