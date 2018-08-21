import { Keyword } from '../interface/index';
import { isObject } from '../util';
export default {
  name: 'notEmpty',
  validator(value, ctx, cb) {
    const type = typeof value;
    switch (true) {
      case type === 'number':
        cb(value === 0);
        break;
      case type === 'string':
        cb(value === '');
        break;
      case Array.isArray(value):
        cb(value.length === 0);
        break;
      case isObject(value):
        cb(Object.keys(value).length === 0);
        break;
      default:
        cb(value == null);
    }
  }
} as Keyword;
