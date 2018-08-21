import _ from '../../src/index';
import { runTest, TestCaseConfig } from '../runTest';

const cases: TestCaseConfig = {
  name: 'bin',
  cases: [
    {
      schema: _.bin,
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
