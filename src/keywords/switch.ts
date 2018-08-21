import {
  GateSchemaBase,
  Keyword,
  SchemaValidationCtx,
  ValidationCtxHighOrder,
  ValidationOptions
} from '../interface/index';
import { getConstraints } from '../util';

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
  const [targetPath, branches] = args;
  const length = branches.length;
  const targetValue = this.getValue(targetPath, rootData, path, state.values);
  const next = (i: number) => {
    if (i < length) {
      const branch = branches[i];
      const caseItem = branch.case;
      const schema = branch.schema;
      this.validate(
        targetValue,
        {
          schema: caseItem,
          path: targetPath,
          rootData,
          state,
          options
        } as SchemaValidationCtx,
        (err: any) => {
          if (!err) {
            cb(schema);
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
  name: 'switch',
  validator(
    value,
    { path, rootData, state, args, options }: ValidationCtxHighOrder,
    cb
  ) {
    getMatchSchema.call(
      this,
      {
        args,
        path,
        rootData,
        state,
        options
      },
      (schema: undefined | GateSchemaBase) => {
        if (schema) {
          this.validate(
            value,
            {
              schema: getConstraints(schema),
              path,
              rootData,
              state,
              options
            } as SchemaValidationCtx,
            cb
          );
        } else {
          // no matching schema
          cb();
        }
      }
    );
  }
} as Keyword;
