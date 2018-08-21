import { Keyword } from '../interface/index';
export default {
  name: 'optional',
  add() {
    const first = this.constraints[0];
    if (first && (first === 'required' || first.name === 'required')) {
      this.constraints.splice(0, 1, 'optional');
    } else {
      this.constraints.unshift('optional');
    }
    this.lastConstraintIndex = 0;
    return this;
  },
  validator(value, ctx, cb) {
    value == null ? cb(this.BREAK) : cb();
  }
} as Keyword;
