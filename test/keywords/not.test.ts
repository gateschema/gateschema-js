import { runTest, TestCaseConfig } from './index';

import _ from '../../src/index';

const cases: TestCaseConfig = {
  name: 'not',
  cases: [
    {
      schema: _.map({
        password: _.string,
        repassword: _.not(_.equal('./password'))
      }),
      pass: [
        {
          password: '123456',
          repassword: '12'
        }
      ],
      fail: [
        {
          password: '123456',
          repassword: '123456'
        }
      ]
    }
  ]
};
runTest(cases);
