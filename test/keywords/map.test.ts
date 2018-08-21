import { runTest, TestCaseConfig } from './index';

import _ from '../../src';

const cases: TestCaseConfig = {
  name: 'map',
  cases: [
    {
      schema: _.map({
        id: _.string
      }),
      pass: [
        {
          id: '1'
        }
      ],
      fail: [
        true,
        1,
        {
          id: 1
        }
      ]
    }
  ]
};
runTest(cases);
