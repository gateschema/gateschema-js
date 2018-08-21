import { Keyword } from '../interface/index';
export default {
  name: 'required',
  add() {
    const first = this.constraints[0];
    if (first && (first === 'optional' || first.name === 'optional')) {
      this.constraints.splice(0, 1, 'required');
    } else {
      this.constraints.unshift('required');
    }
    this.lastConstraintIndex = 0;
    return this;
  },
  validator(value, ctx, cb) {
    value == null ? cb(true) : cb();
  }
} as Keyword;
