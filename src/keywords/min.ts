import Big from 'big.js';
import { Keyword, ValidationCtxHighOrder } from '../interface/index';
export default {
  isHighOrder: true,
  name: 'min',
  validator(value, { path, state, args }: ValidationCtxHighOrder, cb) {
    const [min, isExclusive] = args;
    const valueBig = new Big(value);
    const minBig = new Big(min);
    if (valueBig.lt(minBig) || (isExclusive && valueBig.eq(minBig))) {
      return cb({
        KEY: isExclusive ? 'min_exclusive' : 'min',
        value,
        min,
        isExclusive
      });
    }
    cb();
  }
} as Keyword;
