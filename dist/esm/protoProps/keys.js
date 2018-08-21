export default function $keys() {
    var keys = [];
    this.constraints.forEach(function (item) {
        if (item.keyword === 'map') {
            keys = keys.concat(Object.keys(item.args[0]));
        }
        else if (item.keyword === 'switch') {
            item.args[1].forEach(function (caseItem) {
                keys = keys.concat(caseItem.schema.$keys());
            });
        }
    });
    return keys;
}
//# sourceMappingURL=keys.js.map