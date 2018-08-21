import { runTest, TestCaseConfig } from '../runTest';

import _ from '../../src';

const cases: TestCaseConfig = {
  name: 'num',
  cases: [
    {
      schema: _.num,
      pass: [0, 1, '0', '1', '1.1', 1.1e2, '1.1e2'],
      fail: [undefined, null, true, {}, []]
    }
  ]
};
runTest(cases);
