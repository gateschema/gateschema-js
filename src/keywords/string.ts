import { Keyword } from '../interface/index';
export default {
  name: 'string',
  validator(value, { path, state }, cb) {
    state.types[path] = 'string';
    cb(typeof value !== 'string');
  }
} as Keyword;
