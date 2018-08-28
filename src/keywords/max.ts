import Big from 'big.js';
import { Keyword, ValidationCtxHighOrder } from '../interface/index';
export default {
  isHighOrder: true,
  name: 'max',
  validator(value, { path, state, args }: ValidationCtxHighOrder, cb) {
    const [max, isExclusive] = args;
    const valueBig = new Big(value);
    const maxBig = new Big(max);
    if (valueBig.gt(maxBig) || (isExclusive && valueBig.eq(maxBig))) {
      return cb({
        KEY: isExclusive ? 'max_exclusive' : 'max',
        value,
        max,
        isExclusive
      });
    }
    cb();
  }
} as Keyword;
