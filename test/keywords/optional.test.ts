import { runTest, TestCaseConfig } from './index';

import _ from '../../src';

const cases: TestCaseConfig = {
  name: 'optional',
  cases: [
    {
      schema: _.optional.string,
      pass: [undefined, null, '', '0'],
      fail: [1, false, true, {}]
    }
  ]
};
runTest(cases);
