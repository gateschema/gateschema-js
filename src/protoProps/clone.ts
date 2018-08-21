import { ConstraintHighOrder, GateSchemaBase } from '../interface/index';

export default function $clone(
  options: { pick?: string[]; omit?: string[] } = {}
) {
  const { pick, omit } = options;
  const constraintsOrigin = JSON.parse(JSON.stringify(this));

  const handleMap = pick
    ? createObjectHandler(key => pick.indexOf(key) === -1)
    : omit
      ? createObjectHandler(key => omit.indexOf(key) > -1)
      : () => undefined;

  const handleConstraints = (constraints: GateSchemaBase['constraints']) => {
    constraints.forEach((item: ConstraintHighOrder) => {
      if (item.keyword === 'map') {
        handleMap(item.args[0]);
      }

      if (item.keyword === 'switch') {
        const cases = item.args[1];
        cases.forEach((caseItem: { schema: GateSchemaBase['constraints'] }) => {
          handleConstraints(caseItem.schema);
        });
      }
    });
  };

  function createObjectHandler(check: (key: string) => boolean) {
    return (obj: { [key: string]: any }) => {
      for (const key in obj) {
        if (check(key)) {
          delete obj[key];
        }
      }
    };
  }

  handleConstraints(constraintsOrigin);
  return new this.constructor({ constraints: constraintsOrigin });
}
