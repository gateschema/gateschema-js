import { Keyword, ValidationCtxHighOrder } from '../interface/index';

export default {
  isHighOrder: true,
  name: 'value',
  validator(value, { args }: ValidationCtxHighOrder, cb) {
    const [expectedValue] = args;
    if (value !== expectedValue) {
      return cb({
        value: expectedValue
      });
    }
    return cb();
  }
} as Keyword;
