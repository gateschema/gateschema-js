import { Keyword } from '../interface/index';
export default {
  isHighOrder: true,
  name: 'other',
  validator(value, ctx, cb) {
    cb();
  }
} as Keyword;
