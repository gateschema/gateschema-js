import { runTest, TestCaseConfig } from './index';

import _ from '../../src/index';

const cases: TestCaseConfig = {
  name: 'enum',
  cases: [
    {
      schema: _.enum({
        foo: 0,
        bar: 1
      }),
      pass: [0, 1],
      fail: [2, '0', '1']
    }
  ]
};
runTest(cases);
