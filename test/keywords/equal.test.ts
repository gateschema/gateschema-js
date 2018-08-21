import { runTest, TestCaseConfig } from '../runTest';

import _ from '../../src/index';

const cases: TestCaseConfig = {
  name: 'equal',
  cases: [
    {
      schema: _.map({
        password: _.string,
        repassword: _.equal('./password')
      }),
      pass: [
        {
          password: '123456',
          repassword: '123456'
        }
      ],
      fail: [
        {
          password: '123456',
          repassword: null
        },
        {
          password: '123456',
          repassword: '123'
        }
      ]
    }
  ]
};
runTest(cases);
