import {
  Keyword,
  SchemaValidationCtx,
  ValidationCtxHighOrder
} from '../interface/index';
export default {
  isHighOrder: true,
  name: 'list',
  validator(
    value,
    { path, rootData, state, args, options }: ValidationCtxHighOrder,
    cb
  ) {
    if (!Array.isArray(value)) {
      return cb(true);
    }

    state.types[path] = 'list';
    let i = 0;
    const length = value.length;
    const schema = args[0];
    const next = (err?: any): void => {
      if (err) {
        return cb(err);
      }
      if (i < length) {
        const key = i++;
        return this.validate(
          value[key],
          {
            schema,
            path: path === '/' ? `/${key}` : `${path}/${key}`,
            rootData,
            state,
            options
          } as SchemaValidationCtx,
          next
        );
      }
      return cb(err);
    };
    next();
  }
} as Keyword;
