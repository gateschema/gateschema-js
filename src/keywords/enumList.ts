import {
  Constraint,
  GateSchemaBaseConstructor,
  Keyword,
  SchemaValidationCtx,
  ValidationCtxHighOrder
} from '../interface/index';
export default {
  isHighOrder: true,
  name: 'enumList',
  validator(
    receivedValue,
    { path, rootData, args, state, options }: ValidationCtxHighOrder,
    cb
  ) {
    const [expectedValues = {}] = args;

    const constraints: Constraint[] = [
      {
        keyword: 'list',
        args: [
          [
            {
              keyword: 'enum',
              args: [expectedValues]
            }
          ]
        ]
      }
    ];

    (this as GateSchemaBaseConstructor).validate(
      receivedValue,
      {
        schema: constraints,
        path,
        rootData,
        state,
        options
      } as SchemaValidationCtx,
      (err: any) => {
        if (err) {
          const keys = Object.keys(expectedValues);
          const values = keys.map(key => expectedValues[key]);
          return cb({
            keys,
            values
          });
        }
        cb();
      }
    );
  }
} as Keyword;
