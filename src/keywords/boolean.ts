import { Keyword } from '../interface/index';
export default {
  name: 'boolean',
  validator(value, { path, state }, cb) {
    state.types[path] = 'boolean';
    cb(typeof value !== 'boolean');
  }
} as Keyword;
