export default {
    name: 'cond',
    add: function () {
        var _this = this;
        return function (path, whenNotNull, whenNull) {
            var _ = _this.constructor;
            return _.switch(path, [
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
//# sourceMappingURL=cond.js.map