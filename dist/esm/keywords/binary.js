import { isBase64 } from '../util';
export default {
    name: 'binary',
    validator: function (value, _a, cb) {
        var path = _a.path, state = _a.state;
        state.types[path] = 'binary';
        if (isBase64(value)) {
            return cb();
        }
        if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
            return cb();
        }
        cb(true);
    }
};
//# sourceMappingURL=binary.js.map