"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cond = {
    name: 'cond',
    add: function () {
        var _this = this;
        return function (path, whenNotNull, whenNull) {
            var _ = _this.constructor;
            return _this.switch(path, [
                {
                    case: _.required,
                    schema: whenNotNull
                },
                {
                    case: _.any,
                    schema: whenNull || _.any
                }
            ]);
        };
    }
};
var r = {
    name: 'r',
    add: function () {
        return this.required;
    }
};
var o = {
    name: 'o',
    add: function () {
        return this.optional;
    }
};
var bool = {
    name: 'bool',
    add: function () {
        return this.boolean;
    }
};
var num = {
    name: 'num',
    add: function () {
        return this.number;
    }
};
var str = {
    name: 'str',
    add: function () {
        return this.string;
    }
};
var bin = {
    name: 'bin',
    add: function () {
        return this.binary;
    }
};
exports.default = [r, o, bool, num, str, bin, cond];
//# sourceMappingURL=index.js.map