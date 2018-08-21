import { runTest, TestCaseConfig } from './index';

import _ from '../../src';

const cases: TestCaseConfig = {
  name: 'oneOf',
  cases: [
    {
      schema: _.oneOf([_.string, _.number]),
      pass: ['1', 0],
      fail: [undefined, null, true, {}, []]
    }
  ]
};
runTest(cases);
