import { runTest, TestCaseConfig } from './index';

import _ from '../../src';

const cases: TestCaseConfig = {
  name: 'list',
  cases: [
    {
      schema: _.list(_.string),
      pass: [['a', 'b']],
      fail: [[1, 2]]
    },
    {
      schema: _.list(_.number),
      pass: [[1, 2]],
      fail: [['a', 'b']]
    }
  ]
};

runTest(cases);
