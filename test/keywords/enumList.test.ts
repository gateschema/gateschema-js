import { runTest, TestCaseConfig } from '../runTest';

import _ from '../../src/index';

const cases: TestCaseConfig = {
  name: 'enumList',
  cases: [
    {
      schema: _.enumList({
        foo: 0,
        bar: 1
      }),
      pass: [[0], [1], [0, 1]],
      fail: [1, [2], ['0'], ['1'], ['1', 1]]
    }
  ]
};
runTest(cases);
