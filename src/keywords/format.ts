import { Keyword, ValidationCtxHighOrder } from '../interface/index';
import validators from './format_validator';

export default {
  isHighOrder: true,
  name: 'format',
  validator(value, { args }: ValidationCtxHighOrder, cb) {
    const format: string = args[0];
    const validator = validators[format];
    if (validator) {
      if (!validator(value)) {
        return cb({
          format
        });
      }
      return cb();
    }
    return cb(new Error(`no validator for format: ${format}`));
  }
} as Keyword;
