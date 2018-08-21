import { runTest, TestCaseConfig } from './index';

import _ from '../../src';

// tslint:disable object-literal-sort-keys
const cases: TestCaseConfig = {
  name: 'switch',
  cases: [
    {
      schema: _.map({
        registerType: _.enum({
          email: 0,
          mobile: 1
        })
      }).switch('/registerType', [
        {
          case: _.value(0),
          schema: _.map({
            email: _.required.string
          })
        },
        {
          case: _.value(1),
          schema: _.map({
            mobile: _.required.string
          })
        }
      ]),
      pass: [
        {
          registerType: 0,
          email: 'foo@bar.com'
        },
        {
          registerType: 1,
          mobile: '123456'
        }
      ],
      fail: [
        {
          registerType: 1,
          email: 'foo@bar.com'
        },
        {
          registerType: 2,
          mobile: '123456'
        },
        {
          registerType: 3
        }
      ]
    },
    {
      schema: _.map({
        id: _.string,
        address: _.map({
          contact: _.optional.string,
          code: _.switch('/address/contact', [
            {
              case: _.required,
              schema: _.required.number
            },
            {
              case: _.any,
              schema: _.any
            }
          ])
        })
      }),
      pass: [
        {
          id: '1',
          address: {
            contact: 'hello',
            code: 123
          }
        },
        {
          id: '1',
          address: {}
        }
      ],
      fail: [
        {
          id: '1',
          address: {
            contact: 'hello'
          }
        },
        {
          id: '1',
          address: {
            contact: 'hello',
            code: 'abc'
          }
        }
      ]
    },
    {
      schema: _.map({
        id: _.string
      }).switch('/id', [
        {
          case: _.value('1'),
          schema: _.map({
            name: _.string
          })
        },
        {
          case: _.any,
          schema: _.map({
            name: _.number
          })
        }
      ]),
      pass: [
        {
          id: '1',
          name: 'a'
        },
        {
          id: '2',
          name: 1
        }
      ],
      fail: [
        {
          id: '1',
          name: 1
        },
        {
          id: '2',
          name: 'a'
        }
      ]
    },
    {
      schema: _.map({
        name: _.any,
        address: _.map({
          mobile: _.switch('../name', [
            {
              case: _.string,
              schema: _.string
            }
          ])
        }),
        point: _.switch('./name', [
          {
            case: _.string,
            schema: _.string
          }
        ])
      }),
      pass: [
        {
          name: '1',
          address: {
            mobile: '2'
          },
          point: '3'
        }
      ],
      fail: [
        {
          name: '1',
          address: {
            mobile: 2
          },
          point: 2
        }
      ]
    }
  ]
};
runTest(cases);
