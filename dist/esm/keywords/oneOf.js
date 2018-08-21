function getMatchSchema(_a, cb) {
    var _this = this;
    var path = _a.path, args = _a.args, rootData = _a.rootData, _b = _a.state, state = _b === void 0 ? {} : _b, options = _a.options;
    var schemas = args[0];
    var length = schemas.length;
    var value = this.getValue(path, rootData, path, state.values);
    var schemaItem;
    var next = function (i) {
        if (i < length) {
            schemaItem = schemas[i];
            _this.validate(value, {
                schema: schemaItem,
                path: path,
                rootData: rootData,
                state: state,
                options: options
            }, function (err) {
                if (!err) {
                    cb(schemaItem);
                }
                else {
                    next(++i);
                }
            });
        }
        else {
            cb();
        }
    };
    next(0);
}
export default {
    getMatchSchema: getMatchSchema,
    isHighOrder: true,
    name: 'oneOf',
    validator: function (value, _a, cb) {
        var path = _a.path, rootData = _a.rootData, state = _a.state, args = _a.args, options = _a.options;
        getMatchSchema.call(this, {
            path: path,
            args: args,
            rootData: rootData,
            state: state,
            options: options
        }, function (schema) {
            if (schema) {
                cb();
            }
            else {
                cb(true);
            }
        });
    }
};
//# sourceMappingURL=oneOf.js.map