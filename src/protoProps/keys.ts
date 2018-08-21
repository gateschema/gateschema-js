import { ConstraintHighOrder, GateSchemaBase } from '../interface/index';

export default function $keys() {
  let keys: string[] = [];
  this.constraints.forEach((item: ConstraintHighOrder) => {
    if (item.keyword === 'map') {
      keys = keys.concat(Object.keys(item.args[0]));
    } else if (item.keyword === 'switch') {
      item.args[1].forEach((caseItem: { schema: GateSchemaBase }) => {
        keys = keys.concat(caseItem.schema.$keys());
      });
    }
  });
  return keys;
}
