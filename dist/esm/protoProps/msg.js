export default function $msg(msg) {
    var lastConstraintIndex = this.lastConstraintIndex;
    var constraints = this.constraints;
    var lastConstraint = constraints[lastConstraintIndex];
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
//# sourceMappingURL=msg.js.map