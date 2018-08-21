export default function $get(path, rootData, validationOptions, cb) {
    if (typeof rootData === 'function') {
        cb = rootData;
        rootData = undefined;
    }
    else if (typeof validationOptions === 'function') {
        cb = validationOptions;
        validationOptions = {};
    }
    this.constructor.getSchema(path, {
        rootData: rootData,
        options: validationOptions,
        rootSchema: this
    }, cb);
    return this;
}
//# sourceMappingURL=get.js.map