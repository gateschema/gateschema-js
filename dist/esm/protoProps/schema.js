export default function $schema(path, rootData, cb) {
    if (typeof rootData === 'function') {
        cb = rootData;
        rootData = {};
    }
    this.constructor.getSchema({
        path: path,
        rootData: rootData,
        rootSchema: this
    }, cb);
    return this;
}
//# sourceMappingURL=schema.js.map