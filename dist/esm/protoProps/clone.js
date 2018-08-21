export default function $clone(options) {
    if (options === void 0) { options = {}; }
    var pick = options.pick, omit = options.omit;
    var constraintsOrigin = JSON.parse(JSON.stringify(this));
    var handleMap = pick
        ? createObjectHandler(function (key) { return pick.indexOf(key) === -1; })
        : omit
            ? createObjectHandler(function (key) { return omit.indexOf(key) > -1; })
            : function () { return undefined; };
    var handleConstraints = function (constraints) {
        constraints.forEach(function (item) {
            if (item.keyword === 'map') {
                handleMap(item.args[0]);
            }
            if (item.keyword === 'switch') {
                var cases = item.args[1];
                cases.forEach(function (caseItem) {
                    handleConstraints(caseItem.schema);
                });
            }
        });
    };
    function createObjectHandler(check) {
        return function (obj) {
            for (var key in obj) {
                if (check(key)) {
                    delete obj[key];
                }
            }
        };
    }
    handleConstraints(constraintsOrigin);
    return new this.constructor({ constraints: constraintsOrigin });
}
//# sourceMappingURL=clone.js.map