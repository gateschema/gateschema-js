import {
  GateSchemaBase,
  Keyword,
  SchemaValidationCtx,
  ValidationCtxHighOrder
} from '../interface/index';

export default {
  isHighOrder: true,
  name: 'not',
  validator(
    value,
    { path, rootData, state, args, options }: ValidationCtxHighOrder,
    cb
  ) {
    const schema = args[0] as GateSchemaBase;
    this.validate(
      value,
      {
        schema,
        path,
        rootData,
        state,
        options
      } as SchemaValidationCtx,
      (err: any) => {
        if (err) {
          cb();
        } else {
          cb(true);
        }
      }
    );
  }
} as Keyword;
