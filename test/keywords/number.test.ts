import { runTest, TestCaseConfig } from './index';

import _ from '../../src';

const cases: TestCaseConfig = {
  name: 'number',
  cases: [
    {
      schema: _.number,
      pass: [0, 1, '0', '1', '1.1', 1.1e2, '1.1e2'],
      fail: [undefined, null, true, {}, []]
    }
  ]
};
runTest(cases);
