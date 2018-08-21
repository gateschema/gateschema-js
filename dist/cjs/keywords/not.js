"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    isHighOrder: true,
    name: 'not',
    validator: function (value, _a, cb) {
        var path = _a.path, rootData = _a.rootData, state = _a.state, args = _a.args, options = _a.options;
        var schema = args[0];
        this.validate(value, {
            schema: schema,
            path: path,
            rootData: rootData,
            state: state,
            options: options
        }, function (err) {
            if (err) {
                cb();
            }
            else {
                cb(true);
            }
        });
    }
};
//# sourceMappingURL=not.js.map