import { Keyword, ValidationCtxHighOrder } from '../interface/index';
export default {
  isHighOrder: true,
  name: 'enum',
  validator(receivedValue, { args }: ValidationCtxHighOrder, cb) {
    const [expectedValues = {}] = args as any;
    for (const key in expectedValues) {
      if (expectedValues[key] === receivedValue) {
        return cb();
      }
    }
    const keys = Object.keys(expectedValues);
    const values = keys.map(key => expectedValues[key]);
    cb({
      keys: JSON.stringify(keys),
      values: JSON.stringify(values)
    });
  }
} as Keyword;
