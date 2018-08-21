import { Keyword } from '../interface/index';
import { isBase64 } from '../util';

export default {
  name: 'binary',
  validator(value, { path, state }, cb) {
    state.types[path] = 'binary';
    if (isBase64(value)) {
      return cb();
    }
    if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
      return cb();
    }
    cb(true);
  }
} as Keyword;
