import aliases from './alias/index';
import keywords from './keywords/index';
import msgs from './msgs';
import protoProps from './protoProps/index';
import GateSchemaBase from './schemaBase';
var _ = GateSchemaBase.extend({
    aliases: aliases,
    keywords: keywords,
    msgs: msgs
});
var r = _.extend({
    initConstraints: ['required']
});
var o = _.extend({
    initConstraints: ['optional']
});
Object.assign(GateSchemaBase.prototype, protoProps);
export { _, r, o };
export default _;
//# sourceMappingURL=index.js.map