"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isObject(x) {
    return x != null && typeof x === 'object';
}
exports.isObject = isObject;
function getConstraints(schema) {
    if (Array.isArray(schema)) {
        return schema;
    }
    return schema.constraints;
}
exports.getConstraints = getConstraints;
exports.charCount = (function (ArrayFrom) {
    return ArrayFrom
        ? function (str) {
            return str.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, '_').length;
        }
        : function (str) { return ArrayFrom(str).length; };
})(Array.from);
function isBase64(str) {
    return (typeof str === 'string' &&
        /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/.test(str));
}
exports.isBase64 = isBase64;
//# sourceMappingURL=util.js.map