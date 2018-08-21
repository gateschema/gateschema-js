export function isObject(x) {
    return x != null && typeof x === 'object';
}
export function getConstraints(schema) {
    if (Array.isArray(schema)) {
        return schema;
    }
    return schema.constraints;
}
export var charCount = (function (ArrayFrom) {
    return ArrayFrom
        ? function (str) {
            return str.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, '_').length;
        }
        : function (str) { return ArrayFrom(str).length; };
})(Array.from);
export function isBase64(str) {
    return (typeof str === 'string' &&
        /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/.test(str));
}
//# sourceMappingURL=util.js.map