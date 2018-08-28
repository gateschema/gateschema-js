import Big from 'big.js';
import { Keyword } from '../interface/index';
export default {
  name: 'number',
  validator(value, { path, state }, cb) {
    state.types[path] = 'number';
    try {
      // tslint:disable no-unused-expression
      new Big(value);
    } catch (e) {
      return cb(true);
    }
    cb();
  }
} as Keyword;
