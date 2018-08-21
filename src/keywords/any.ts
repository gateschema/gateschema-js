import { Keyword } from '../interface/index';
export default {
  name: 'any',
  validator(value, ctx, cb) {
    cb();
  }
} as Keyword;
