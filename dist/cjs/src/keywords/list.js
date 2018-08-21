"use strict";
exports.__esModule = true;
exports["default"] = {
    isHighOrder: true,
    name: 'list',
    validator: function (value, _a, cb) {
        var _this = this;
        var path = _a.path, rootData = _a.rootData, state = _a.state, args = _a.args, options = _a.options;
        if (!Array.isArray(value)) {
            return cb(true);
        }
        state.types[path] = 'list';
        var i = 0;
        var length = value.length;
        var schema = args[0];
        var next = function (err) {
            if (err) {
                return cb(err);
            }
            if (i < length) {
                var key = i++;
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
    }
};
