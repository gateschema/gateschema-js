import { runTest, TestCaseConfig } from '../runTest';

import _ from '../../src';

const cases: TestCaseConfig = {
  name: 'len',
  cases: [
    {
      schema: _.string.length(2),
      pass: ['ab'],
      fail: ['a', 'abc']
    },
    {
      schema: _.string.length([2]),
      pass: ['ab', 'abc'],
      fail: ['a', '']
    },
    {
      schema: _.string.length([, 2]),
      pass: ['ab', 'a'],
      fail: ['abc']
    },

    {
      schema: _.string.length([1, 2]),
      pass: ['ab', 'a'],
      fail: ['', 'abc']
    },

    {
      schema: _.list(_.number).length(3),
      pass: [[1, 2, 3]],
      fail: [[1, 2], [1, 2, 3, 4]]
    },
    {
      schema: _.list(_.number).length([3]),
      pass: [[1, 2, 3], [1, 2, 3, 4]],
      fail: [[1, 2], [1]]
    },
    {
      schema: _.list(_.number).length([, 3]),
      pass: [[1, 2], [1, 2, 3]],
      fail: [[1, 2, 3, 4]]
    },
    {
      schema: _.list(_.number).length([2, 3]),
      pass: [[1, 2], [1, 2, 3]],
      fail: [[1], [1, 2, 3, 4]]
    },

    {
      schema: _.binary.length(2),
      pass: [
        new ArrayBuffer(2),
        // btoa(String.fromCharCode.apply(null, new Uint8Array(2)))
        'AAA='
      ],
      fail: [new ArrayBuffer(1), 'AA==', new ArrayBuffer(3), 'AAAA']
    },
    {
      schema: _.binary.length([2]),
      pass: [new ArrayBuffer(2), 'AAA=', new ArrayBuffer(3), 'AAAA'],
      fail: [new ArrayBuffer(1), 'AA==']
    },
    {
      schema: _.binary.length([, 2]),
      pass: [new ArrayBuffer(1), 'AA==', new ArrayBuffer(2), 'AAA='],
      fail: [new ArrayBuffer(3), 'AAAA']
    },
    {
      schema: _.binary.length([1, 2]),
      pass: [new ArrayBuffer(1), 'AA==', new ArrayBuffer(2), 'AAA='],
      fail: ['', new ArrayBuffer(3), 'AAAA']
    }
  ]
};
runTest(cases);
