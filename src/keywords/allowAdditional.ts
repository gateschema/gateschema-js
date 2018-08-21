import { Keyword } from '../interface/index';
export default {
  name: 'allowAdditional',
  validator(value, { path, state }, cb) {
    state.mapAllowAdditional[path] = true;
    cb();
  }
} as Keyword;
