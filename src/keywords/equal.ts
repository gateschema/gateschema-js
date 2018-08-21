import { Keyword, ValidationCtxHighOrder } from '../interface/index';

export default {
  isHighOrder: true,
  name: 'equal',
  validator(
    value,
    { path, rootData, state, args }: ValidationCtxHighOrder,
    cb
  ) {
    const [targetId] = args;
    const targetValue = this.getValue(targetId, rootData, path, state.values);
    if (value !== targetValue) {
      return cb({
        id: targetId
      });
    }
    return cb();
  }
} as Keyword;
