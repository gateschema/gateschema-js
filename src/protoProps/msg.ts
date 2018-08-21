export default function $msg(msg: string) {
  const lastConstraintIndex = this.lastConstraintIndex;
  const constraints = this.constraints;
  let lastConstraint = constraints[lastConstraintIndex];
  if (lastConstraint) {
    if (typeof lastConstraint === 'string') {
      lastConstraint = {
        keyword: lastConstraint
      };
      constraints.splice(lastConstraintIndex, 1, lastConstraint);
    }
    lastConstraint.msg = msg;
  }
  return this;
}
