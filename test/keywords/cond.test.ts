import { runTest, TestCaseConfig } from './index';

import _ from '../../src/index';

const cases: TestCaseConfig = {
  name: 'cond',
  cases: [
    {
      schema: _.map({
        id: _.optional.string,
        name: _.cond('/id', _.required.string, _.optional)
      }),
      pass: [
        {
          id: '1',
          name: '2'
        },
        {}
      ],
      fail: [
        {
          id: '1'
        }
      ]
    },
    {
      schema: _.map({
        id: _.optional.string,
        name: _.cond('/id', _.required.string)
      }),
      pass: [
        {
          id: '1',
          name: '2'
        },
        {
          name: 1 // any
        },
        {}
      ],
      fail: [
        {
          id: '1'
        }
      ]
    }
  ]
};
runTest(cases);
