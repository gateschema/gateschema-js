"use strict";
exports.__esModule = true;
exports["default"] = {
    isHighOrder: true,
    name: 'enumList',
    validator: function (receivedValue, _a, cb) {
        var path = _a.path, rootData = _a.rootData, args = _a.args, state = _a.state, options = _a.options;
        var _b = args[0], expectedValues = _b === void 0 ? {} : _b;
        var constraints = [
            {
                keyword: 'list',
                args: [
                    [
                        {
                            keyword: 'enum',
                            args: [expectedValues]
                        }
                    ]
                ]
            }
        ];
        this.validate(receivedValue, {
            schema: constraints,
            path: path,
            rootData: rootData,
            state: state,
            options: options
        }, function (err) {
            if (err) {
                var keys = Object.keys(expectedValues);
                var values = keys.map(function (key) { return expectedValues[key]; });
                return cb({
                    keys: keys,
                    values: values
                });
            }
            cb();
        });
    }
};
