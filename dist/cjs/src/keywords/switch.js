"use strict";
exports.__esModule = true;
var util_1 = require("../util");
function getMatchSchema(_a, cb) {
    var _this = this;
    var path = _a.path, args = _a.args, rootData = _a.rootData, _b = _a.state, state = _b === void 0 ? {} : _b, options = _a.options;
    var targetPath = args[0], branches = args[1];
    var length = branches.length;
    var targetValue = this.getValue(targetPath, rootData, path, state.values);
    var next = function (i) {
        if (i < length) {
            var branch = branches[i];
            var caseItem = branch["case"];
            var schema_1 = branch.schema;
            _this.validate(targetValue, {
                schema: caseItem,
                path: targetPath,
                rootData: rootData,
                state: state,
                options: options
            }, function (err) {
                if (!err) {
                    cb(schema_1);
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
exports["default"] = {
    getMatchSchema: getMatchSchema,
    isHighOrder: true,
    name: 'switch',
    validator: function (value, _a, cb) {
        var _this = this;
        var path = _a.path, rootData = _a.rootData, state = _a.state, args = _a.args, options = _a.options;
        getMatchSchema.call(this, {
            args: args,
            path: path,
            rootData: rootData,
            state: state,
            options: options
        }, function (schema) {
            if (schema) {
                _this.validate(value, {
                    schema: util_1.getConstraints(schema),
                    path: path,
                    rootData: rootData,
                    state: state,
                    options: options
                }, cb);
            }
            else {
                // no matching schema
                cb();
            }
        });
    }
};
