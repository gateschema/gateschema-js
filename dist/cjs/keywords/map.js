"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("../util");
exports.default = {
    isHighOrder: true,
    name: 'map',
    validator: function (value, _a, cb) {
        var _this = this;
        var path = _a.path, rootData = _a.rootData, state = _a.state, args = _a.args, options = _a.options;
        state.types[path] = 'map';
        var obj = args[0];
        var keys = Object.keys(obj);
        var length = keys.length;
        var stateValues = state.values;
        var stateMapDefinitions = state.mapDefinitions;
        if (stateMapDefinitions[path]) {
            stateMapDefinitions[path].push(obj);
        }
        else {
            stateValues[path] = value;
            stateMapDefinitions[path] = [obj];
        }
        if (!util_1.isObject(value)) {
            return cb(true);
        }
        var i = 0;
        var key;
        var schema;
        var next = function (err) {
            if (err) {
                return cb(err);
            }
            if (i < length) {
                key = keys[i++];
                schema = obj[key];
                return _this.validate(value[key], {
                    schema: schema,
                    path: path === '/' ? "/" + key : path + "/" + key,
                    rootData: rootData,
                    state: state,
                    options: options
                }, next);
            }
            return cb(err);
        };
        next();
    },
    getChildSchema: function (_a, cb) {
        var childKey = _a.childKey, args = _a.args;
        var obj = args[0];
        cb(obj[childKey]);
    }
};
//# sourceMappingURL=map.js.map