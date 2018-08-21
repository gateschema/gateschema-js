import {
  GateSchemaBase,
  Keyword,
  SchemaValidationCtx,
  ValidationCtxHighOrder,
  ValidationOptions
} from '../interface/index';

function getMatchSchema(
  {
    path,
    args,
    rootData,
    state = {},
    options
  }: {
    path: string;
    args: any[];
    rootData: any;
    state: any;
    options: ValidationOptions;
  },
  cb: any
) {
  const [schemas] = args;
  const length = schemas.length;
  const value = this.getValue(path, rootData, path, state.values);
  let schemaItem: GateSchemaBase;
  const next = (i: number) => {
    if (i < length) {
      schemaItem = schemas[i];
      this.validate(
        value,
        {
          schema: schemaItem,
          path,
          rootData,
          state,
          options
        } as SchemaValidationCtx,
        (err: any) => {
          if (!err) {
            cb(schemaItem);
          } else {
            next(++i);
          }
        }
      );
    } else {
      cb();
    }
  };
  next(0);
}

export default {
  getMatchSchema,
  isHighOrder: true,
  name: 'oneOf',
  validator(
    value,
    { path, rootData, state, args, options }: ValidationCtxHighOrder,
    cb
  ) {
    getMatchSchema.call(
      this,
      {
        path,
        args,
        rootData,
        state,
        options
      },
      (schema: undefined | GateSchemaBase) => {
        if (schema) {
          cb();
        } else {
          cb(true);
        }
      }
    );
  }
} as Keyword;
