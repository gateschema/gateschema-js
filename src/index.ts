import aliases from './alias/index';
import { GateSchemaConstructor } from './interface/index';
import keywords from './keywords/index';
import msgs from './msgs';
import protoProps from './protoProps/index';
import GateSchemaBase from './schemaBase';

const _ = (GateSchemaBase.extend({
  aliases,
  keywords,
  msgs
}) as any) as GateSchemaConstructor;

const r = _.extend({
  initConstraints: ['required']
});

const o = _.extend({
  initConstraints: ['optional']
});

Object.assign(GateSchemaBase.prototype, protoProps);
export { _, r, o };
export default _;
