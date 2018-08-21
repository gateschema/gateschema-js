import {
  ConstraintHighOrder,
  Keyword,
  ValidationCtxHighOrder
} from '../interface/index';
export default {
  isHighOrder: true,
  name: 'pattern',
  add() {
    return (pattern: RegExp | string, flags?: string) => {
      const constraint: ConstraintHighOrder = { keyword: 'pattern' } as any;
      if (pattern instanceof RegExp) {
        constraint.args = [pattern.source, pattern.flags];
      } else if (typeof pattern === 'string') {
        constraint.args = [pattern, flags];
      } else {
        throw new Error(
          'pattern should be an RegExp instance or RegExp source string'
        );
      }
      this.add(constraint);
      return this;
    };
  },
  validator(value, { args }: ValidationCtxHighOrder, cb) {
    let reg;
    try {
      reg = RegExp.apply(null, args);
    } catch (e) {
      return cb(new Error('invalid pattern'));
    }
    return cb(!reg.test(value));
  }
} as Keyword;
