import {
  Keyword,
  SchemaValidationCtx,
  ValidationCtxHighOrder
} from '../interface/index';
import { isObject } from '../util';
export default {
  isHighOrder: true,
  name: 'map',
  validator(
    value,
    { path, rootData, state, args, options }: ValidationCtxHighOrder,
    cb
  ) {
    state.types[path] = 'map';

    const [obj] = args;
    const keys = Object.keys(obj);
    const length = keys.length;
    const stateValues = state.values;
    const stateMapDefinitions = state.mapDefinitions;

    if (stateMapDefinitions[path]) {
      stateMapDefinitions[path].push(obj);
    } else {
      stateValues[path] = value;
      stateMapDefinitions[path] = [obj];
    }

    if (!isObject(value)) {
      return cb(true);
    }

    let i = 0;
    let key;
    let schema;
    const next = (err?: any): void => {
      if (err) {
        return cb(err);
      }
      if (i < length) {
        key = keys[i++];
        schema = obj[key];
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
  },
  getChildSchema({ childKey, args }, cb) {
    const [obj] = args;
    cb(obj[childKey]);
  }
} as Keyword;
