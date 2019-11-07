import { Keyword, ValidationCtxHighOrder } from '../interface/index';
import { charCount } from '../util';

export default {
  isHighOrder: true,
  name: 'len',
  validator(value, { path, state, args }: ValidationCtxHighOrder, cb) {
    const type = state.types[path];
    let valueLength;
    if (!type) {
      return cb(new Error('missing type declaration'));
    }
    switch (type) {
      case 'string':
        valueLength = charCount(value);
        break;
      case 'list':
        valueLength = value.length;
        break;
      case 'binary':
        if (typeof value === 'string') {
          valueLength = value.length;
          if (valueLength > 0) {
            // base64 bytes
            const index = value.indexOf('=');
            const padding = index > -1 ? valueLength - index : 0;
            valueLength = (3 * valueLength) / 4 - padding;
          }
        } else {
          valueLength = value.byteLength;
        }
        break;
      default:
        return cb(new Error(`can't use length constraint on type: ${type}`));
    }

    let err;
    let errType;
    let length;
    let minLength;
    let maxLength;
    const expected = args[0];

    if (Array.isArray(expected)) {
      [minLength, maxLength] = expected;
      if (minLength != null && maxLength != null) {
        if (valueLength < minLength || valueLength > maxLength) {
          err = true;
          errType = 'range';
        }
      } else if (minLength != null) {
        if (valueLength < minLength) {
          err = true;
          errType = 'min';
        }
      } else if (maxLength != null) {
        if (valueLength > maxLength) {
          err = true;
          errType = 'max';
        }
      } else {
        return cb(new Error('missing minLength or maxLength'));
      }
    } else {
      length = expected;
      if (valueLength !== expected) {
        err = true;
        errType = 'match';
      }
    }

    if (err) {
      return cb({
        KEY: `length_${type}_${errType}`,
        length,
        maxLength,
        minLength,
        valueLength
      });
    }
    cb();
  }
} as Keyword;
