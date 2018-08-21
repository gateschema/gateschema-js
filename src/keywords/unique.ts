import { Keyword, ValidationCtxHighOrder } from '../interface/index';
export default {
  name: 'unique',
  validator(values, ctx: ValidationCtxHighOrder, cb) {
    const uniqueValues: any[] = [];
    for (let i = 0, length = values.length; i < length; i++) {
      const value = values[i];
      if (uniqueValues.indexOf(value) === -1) {
        uniqueValues.push(value);
        continue;
      }
      return cb(true);
    }
    cb();
  }
} as Keyword;
