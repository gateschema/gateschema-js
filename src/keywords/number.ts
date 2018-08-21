import { Keyword } from '../interface/index';
const NUMERIC = /^-?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i;
export default {
  name: 'number',
  validator(value, { path, state }, cb) {
    state.types[path] = 'number';
    if (typeof value === 'number' || NUMERIC.test(value)) {
      return cb();
    }
    cb(true);
  }
} as Keyword;
