import * as I from './interface/index';
import { getConstraints, isObject } from './util';
import ValidationError from './ValidationError';

function getCacheResult(
  path: I.SchemaValidationCtx['path'],
  schema: I.SchemaValidationCtx['schema'],
  { cache }: I.SchemaValidationCtx['state']
) {
  if (typeof cache[path] !== 'undefined') {
    const target = cache[path].find(item => item[0] === schema);
    if (target) {
      return target[1];
    }
  }
}
function appendCacheResult(
  result: null | I.ValidationError,
  path: I.SchemaValidationCtx['path'],
  schema: I.SchemaValidationCtx['schema'],
  { cache }: I.SchemaValidationCtx['state']
) {
  const cacheItem = [schema, result] as I.ValidationResultCacheItem;
  if (cache[path]) {
    cache[path].push(cacheItem);
  } else {
    cache[path] = [cacheItem];
  }
}

function removeAdditional(
  path: I.SchemaValidationCtx['path'],
  { values, mapAllowAdditional, mapDefinitions }: I.ValidationState
) {
  const definition = mapDefinitions[path];
  if (definition && !mapAllowAdditional[path]) {
    const objValue = values[path];
    const keys = definition.reduce((result: any[], current: object) => {
      result.push(...Object.keys(current));
      return result;
    }, []) as string[];

    for (const prop in objValue) {
      if (keys.indexOf(prop) === -1) {
        delete objValue[prop];
      }
    }
  }
}
class GateSchema implements I.GateSchemaBase {
  [key: string]: any;
  public static BREAK = Symbol('break');
  public static msgs: I.GateSchemaBaseConstructor['msgs'] = {};
  // tslint:disable variable-name
  public static _asyncKeywords = {} as I.GateSchemaBaseConstructor['_asyncKeywords'];
  public static _validators: I.GateSchemaBaseConstructor['_validators'] = {};
  public static _getMatchSchema: I.GateSchemaBaseConstructor['_getMatchSchema'] = {};
  public static _getChildSchema: I.GateSchemaBaseConstructor['_getChildSchema'] = {};
  // tslint:enable variable-name
  public static Error = ValidationError;
  public static addAlias({ name, add }: I.KeywordAlias) {
    const ctor = this;
    const proto = ctor.prototype;
    if (proto[name]) {
      throw new Error(`keyword ${name} conflict`);
    }
    Object.defineProperty(ctor, name, {
      get() {
        return new ctor()[name];
      }
    });
    Object.defineProperty(proto, name, {
      get() {
        return add.call(this);
      }
    });
  }
  public static addKeyword(keyword: I.Keyword, msgs?: I.Msgs) {
    const {
      name,
      validator,
      getChildSchema,
      getMatchSchema,
      isAsync
    } = keyword;
    const proto = this.prototype;
    const ctor = this;
    Object.defineProperty(ctor, name, {
      get() {
        // notice: use `this` here
        return new this()[name];
      }
    });
    Object.defineProperty(proto, name, {
      get: ctor.createAddFunction(keyword)
    });

    if (msgs) {
      this.addMsgs(msgs);
    }

    if (isAsync) {
      ctor._asyncKeywords[name] = true;
    }
    this._validators[name] = validator;
    if (getChildSchema) {
      this._getChildSchema[name] = getChildSchema;
    }
    if (getMatchSchema) {
      this._getMatchSchema[name] = getMatchSchema;
    }
  }
  public static createAddFunction(keyword: I.Keyword) {
    const { name, isHighOrder, add } = keyword;
    if (typeof add === 'function') {
      return add;
    } else if (isHighOrder) {
      return function() {
        return (...args: any[]) => {
          if (!args) {
            throw new Error('arguments are required');
          }
          return this.add({
            args,
            keyword: name
          });
        };
      };
    }
    return function() {
      return this.add(name);
    };
  }
  public static addMsgs(msgs: I.Msgs) {
    Object.assign(this.msgs, msgs);
  }
  public static resolvePath(targetPath: string, currentPath: string): string {
    if (targetPath.indexOf('./') === 0) {
      targetPath =
        currentPath.slice(0, currentPath.lastIndexOf('/')) +
        targetPath.slice(1);
    } else if (targetPath.indexOf('../') === 0) {
      const keySplited = targetPath.split('../');
      const keyLength = keySplited.length;
      const idSplited = currentPath.split('/');
      const idLength = idSplited.length;
      if (idLength >= keyLength) {
        targetPath = currentPath
          .split('/')
          .slice(0, -keyLength)
          .concat(keySplited[keyLength - 1])
          .join('/');
      } else {
        throw new Error(`Can't resolve ${currentPath}`);
      }
    }
    return targetPath;
  }
  public static getValue(
    path: string,
    rootData: any,
    currentPath: string | null,
    values: I.SchemaValidationCtx['state']['values'] = {}
  ) {
    if (path === '/') {
      return rootData;
    }
    if (currentPath != null) {
      path = this.resolvePath(path, currentPath);
    }
    if (!Object.getOwnPropertyDescriptor(values, path)) {
      let prop;
      let parentPath;
      let parentValue;
      const index = path.lastIndexOf('/');
      if (index > 0) {
        prop = path.slice(index + 1);
        parentPath = path.slice(0, index);
        parentValue = GateSchema.getValue(parentPath, rootData, null, values);
      } else {
        prop = path.slice(1);
        parentValue = rootData;
      }
      if (isObject(parentValue)) {
        values[path] = parentValue[prop];
      }
    }
    return values[path];
  }
  public static getSchema(
    path: string,
    {
      options,
      rootSchema,
      rootData
    }: {
      options: I.ValidationOptions;
      rootSchema: I.GateSchemaBase;
      rootData: any;
    },
    cb: any
  ) {
    if (path === '/') {
      return cb(rootSchema);
    }
    const keys = path.split('/').slice(1);
    const getChildSchema = (
      {
        childKey,
        parentPath,
        schema
      }: {
        childKey: string;
        parentPath: string;
        schema: I.GateSchemaBase;
      },
      callback: any
    ) => {
      let j = 0;
      let constraint;
      let keyword: string;
      let args: any[];
      let getMatchSchema;
      let getChildSchemaOfKeyword;
      const constraints = getConstraints(schema as I.GateSchemaBase);
      const constraintsLength = constraints.length;
      const tryNext = (result?: any) => {
        if (!result && j < constraintsLength) {
          // next constraint
          constraint = constraints[j++];
          if (typeof constraint === 'object') {
            keyword = constraint.keyword;
            args = (constraint as I.ConstraintHighOrder).args;
          } else {
            keyword = constraint;
            args = [];
          }

          getMatchSchema = this._getMatchSchema[keyword];
          getChildSchemaOfKeyword = this._getChildSchema[keyword];
          if (getMatchSchema) {
            // try to get the match Schema and get the child schema
            getMatchSchema.call(
              this,
              { path: parentPath, args, rootData, state, options },
              (matchSchema: GateSchema) => {
                if (matchSchema) {
                  getChildSchema(
                    {
                      childKey,
                      parentPath,
                      schema: matchSchema
                    },
                    tryNext
                  );
                } else {
                  tryNext();
                }
              }
            );
          } else if (getChildSchemaOfKeyword) {
            getChildSchemaOfKeyword.call(this, { args, childKey }, tryNext);
          } else {
            tryNext();
          }
        } else {
          callback(result);
        }
      };
      tryNext();
    };

    let i = 0;
    let currentPath = '';
    let child: string;
    const length = keys.length;
    const state: I.ValidationState = {
      mapAllowAdditional: {},
      mapDefinitions: {},
      types: {},
      values: {},
      cache: {}
    };
    const next = (currentSchema?: any) => {
      if (currentSchema) {
        if (i < length) {
          currentPath += child ? `/${child}` : `/`;
          child = keys[i++];
          getChildSchema(
            {
              childKey: child,
              parentPath: currentPath,
              schema: currentSchema
            },
            next
          );
        } else {
          cb(
            Array.isArray(currentSchema)
              ? new this({
                  constraints: currentSchema
                })
              : currentSchema
          );
        }
      } else {
        cb();
      }
    };
    next(rootSchema);
  }
  public static extend<T extends I.GateSchemaBaseConstructor>(
    options: {
      defaultOptions?: I.ValidationOptions;
      initConstraints?: I.Constraint[];
      keywords?: I.Keyword[];
      aliases?: I.KeywordAlias[];
      msgs?: I.Msgs;
    } = {}
  ): T {
    const {
      defaultOptions,
      initConstraints,
      keywords,
      aliases,
      msgs
    } = options;
    const parent = this;
    // tslint:disable max-classes-per-file
    class GateSchemaExtended extends parent {}
    // static props
    Object.assign(GateSchemaExtended, parent);
    GateSchemaExtended.msgs = Object.create(parent.msgs);
    GateSchemaExtended._validators = Object.create(parent._validators);
    GateSchemaExtended._getChildSchema = Object.create(parent._getChildSchema);
    GateSchemaExtended._getMatchSchema = Object.create(parent._getMatchSchema);

    const proto = GateSchemaExtended.prototype;
    if (defaultOptions) {
      proto.defaultOptions = defaultOptions;
    }
    if (initConstraints) {
      proto.initConstraints = initConstraints;
    }

    if (Array.isArray(keywords)) {
      keywords.forEach(item => {
        GateSchemaExtended.addKeyword(item);
      });
    }

    if (Array.isArray(aliases)) {
      aliases.forEach(item => {
        GateSchemaExtended.addAlias(item);
      });
    }

    if (msgs) {
      GateSchemaExtended.addMsgs(msgs);
    }

    return GateSchemaExtended as T;
  }
  public static getMsg(key: string) {
    return this.msgs[key];
  }
  public static createError(
    name: I.Keyword['name'],
    value: any,
    msgParams: I.ValidationErrorMsgParams,
    ctx: { path: string; rootData: any; state: any; constraint: I.Constraint }
  ) {
    const constraint = ctx.constraint as I.ConstraintObject;
    const errorParams: any = {
      keyword: name,
      msgParams,
      path: ctx.path,
      value
    };
    const msg: any = constraint.msg || this.getMsg(msgParams.KEY);
    errorParams.msg =
      this.formatMsg(msg, msgParams, constraint) || 'invalid value';
    return new this.Error(errorParams);
  }
  public static formatMsg(
    msg: string,
    msgParams: I.ValidationErrorMsgParams,
    constraint: I.Constraint
  ) {
    if (msg && msg.indexOf('${') > -1) {
      msg = msg.replace(/\$\{(.+?)\}/g, (match, key) => {
        return msgParams[key];
      });
    }
    return msg;
  }
  public static validate(
    value: any,
    { path, rootData, schema, state, options = {} }: I.SchemaValidationCtx,
    cb: I.ValidationCallback
  ) {
    const { _validators, BREAK, Error: VError, _asyncKeywords } = this;
    const {
      removeAdditional: REMOVE_ADDITIONAL,
      skips: SKIPS,
      skipAsync: SKIP_ASYNC,
      useCache: USE_CACHE
    } = options;
    if (USE_CACHE) {
      const resultCache = getCacheResult(path, schema, state);
      if (resultCache) {
        return cb(resultCache);
      }

      const originCb = cb;
      cb = (err: any) => {
        appendCacheResult(err, path, schema, state);
        originCb(err);
      };
    }
    const constraints = getConstraints(schema);
    const constraintsLength = constraints.length;
    let i = 0;
    let item: I.Constraint;
    let args: I.ValidationCtxHighOrder['args'];
    let validator: I.Keyword['validator'];
    let keyword: string;
    let result;
    const next = (err?: any): any => {
      if (err) {
        switch (true) {
          case err === BREAK:
            result = BREAK;
            break;
          case err instanceof VError:
            result = err;
            break;
          case err instanceof Error:
            throw err;
            break;
          default:
            const msgParams: I.ValidationErrorMsgParams =
              err === true ? {} : err;
            if (!msgParams.KEY) {
              msgParams.KEY = keyword;
            }
            result = this.createError(keyword, value, msgParams, {
              constraint: item,
              path,
              rootData,
              state
            });
        }
        cb(result);
      } else if (i < constraintsLength) {
        item = constraints[i++];
        keyword = typeof item === 'string' ? item : item.keyword;

        if (SKIP_ASYNC && _asyncKeywords[keyword]) {
          next();
        }

        args = (item as I.ConstraintHighOrder).args;
        validator = _validators[keyword];
        if (validator) {
          validator.call(
            this,
            value,
            {
              args,
              path,
              rootData,
              state,
              options
            },
            next
          );
        } else if (SKIPS && SKIPS.indexOf(keyword) > -1) {
          // skips
          next();
        } else {
          // error
          cb(
            new Error(
              `no validator for keyword: ${keyword}, constraint: ${JSON.stringify(
                item
              )}`
            )
          );
        }
      } else {
        if (REMOVE_ADDITIONAL) {
          removeAdditional(path, state);
        }
        cb(null);
      }
    };
    next();
  }
  public constraints: I.Constraint[];
  public initConstraints: I.Constraint[];
  public defaultOptions: I.ValidationOptions;
  public lastConstraintIndex: number;
  constructor(options: I.GateSchemaBaseConstructArgs[0] = {}) {
    let constraints = options.constraints;
    if (typeof constraints === 'undefined') {
      constraints = this.initConstraints.slice();
    }
    this.constraints = constraints;
    Object.defineProperty(this, 'lastConstraintIndex', {
      value: 0,
      writable: true
    });
  }
  public add(constraint: I.Constraint) {
    this.lastConstraintIndex = this.constraints.length;
    this.constraints.push(constraint);
    return this;
  }
  // validate(value, cb)
  // await validate(value)
  // validate(value, options, cb)
  // await validate(value,  options)
  public validate(...args: any[]): any {
    const value: any = arguments[0];
    let options: any = arguments[1];
    let cb: any = arguments[2];
    const Ctor = this.constructor as I.GateSchemaBaseConstructor;
    if (typeof options === 'function') {
      cb = options as I.ValidationCallback;
      options = undefined;
    }

    if (options == null) {
      options = this.defaultOptions;
    }

    const ctx: I.SchemaValidationCtx = {
      schema: this.constraints,
      path: '/',
      rootData: value,
      state: {
        mapAllowAdditional: {},
        mapDefinitions: {},
        types: {},
        values: {},
        cache: {}
      },
      options
    };

    if (typeof cb === 'function') {
      Ctor.validate(value, ctx, (err: any) => {
        cb(err === Ctor.BREAK ? null : err);
      });
    } else {
      return new Promise((resolve, reject) => {
        Ctor.validate(value, ctx, (err: any) => {
          err = err === Ctor.BREAK ? null : err;
          return err ? reject(err) : resolve(err);
        });
      });
    }
  }

  public toJSON() {
    return JSON.parse(JSON.stringify(this.constraints));
  }
}
GateSchema.prototype.defaultOptions = {};
GateSchema.prototype.initConstraints = [];

export default GateSchema;
