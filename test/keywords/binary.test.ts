import { runTest, TestCaseConfig } from '../runTest';

import _ from '../../src';

const cases: TestCaseConfig = {
  name: 'binary',
  cases: [
    {
      schema: _.binary,
      pass: [
        '',
        new ArrayBuffer(0),
        'aGVsbG8=',
        new ArrayBuffer(8),
        new Int8Array(8).buffer
      ],
      fail: ['hello', [8]]
    }
  ]
};
runTest(cases);
