"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("./util");
var ValidationError_1 = __importDefault(require("./ValidationError"));
function getCacheResult(path, schema, _a) {
    var cache = _a.cache;
    if (typeof cache[path] !== 'undefined') {
        var target = cache[path].find(function (item) { return item[0] === schema; });
        if (target) {
            return target[1];
        }
    }
}
function appendCacheResult(result, path, schema, _a) {
    var cache = _a.cache;
    var cacheItem = [schema, result];
    if (cache[path]) {
        cache[path].push(cacheItem);
    }
    else {
        cache[path] = [cacheItem];
    }
}
function removeAdditional(path, _a) {
    var values = _a.values, mapAllowAdditional = _a.mapAllowAdditional, mapDefinitions = _a.mapDefinitions;
    var definition = mapDefinitions[path];
    if (definition && !mapAllowAdditional[path]) {
        var objValue = values[path];
        var keys = definition.reduce(function (result, current) {
            result.push.apply(result, Object.keys(current));
            return result;
        }, []);
        for (var prop in objValue) {
            if (keys.indexOf(prop) === -1) {
                delete objValue[prop];
            }
        }
    }
}
var GateSchema = (function () {
    function GateSchema(options) {
        if (options === void 0) { options = {}; }
        var constraints = options.constraints;
        if (typeof constraints === 'undefined') {
            constraints = this.initConstraints.slice();
        }
        this.constraints = constraints;
        Object.defineProperty(this, 'lastConstraintIndex', {
            value: 0,
            writable: true
        });
    }
    GateSchema.addAlias = function (_a) {
        var name = _a.name, add = _a.add;
        var ctor = this;
        var proto = ctor.prototype;
        if (proto[name]) {
            throw new Error("keyword " + name + " conflict");
        }
        Object.defineProperty(ctor, name, {
            get: function () {
                return new ctor()[name];
            }
        });
        Object.defineProperty(proto, name, {
            get: function () {
                return add.call(this);
            }
        });
    };
    GateSchema.addKeyword = function (keyword, msgs) {
        var name = keyword.name, validator = keyword.validator, getChildSchema = keyword.getChildSchema, getMatchSchema = keyword.getMatchSchema, isAsync = keyword.isAsync;
        var proto = this.prototype;
        var ctor = this;
        Object.defineProperty(ctor, name, {
            get: function () {
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
    };
    GateSchema.createAddFunction = function (keyword) {
        var name = keyword.name, isHighOrder = keyword.isHighOrder, add = keyword.add;
        if (typeof add === 'function') {
            return add;
        }
        else if (isHighOrder) {
            return function () {
                var _this = this;
                return function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    if (!args) {
                        throw new Error('arguments are required');
                    }
                    return _this.add({
                        args: args,
                        keyword: name
                    });
                };
            };
        }
        return function () {
            return this.add(name);
        };
    };
    GateSchema.addMsgs = function (msgs) {
        Object.assign(this.msgs, msgs);
    };
    GateSchema.resolvePath = function (targetPath, currentPath) {
        if (targetPath.indexOf('./') === 0) {
            targetPath =
                currentPath.slice(0, currentPath.lastIndexOf('/')) +
                    targetPath.slice(1);
        }
        else if (targetPath.indexOf('../') === 0) {
            var keySplited = targetPath.split('../');
            var keyLength = keySplited.length;
            var idSplited = currentPath.split('/');
            var idLength = idSplited.length;
            if (idLength >= keyLength) {
                targetPath = currentPath
                    .split('/')
                    .slice(0, -keyLength)
                    .concat(keySplited[keyLength - 1])
                    .join('/');
            }
            else {
                throw new Error("Can't resolve " + currentPath);
            }
        }
        return targetPath;
    };
    GateSchema.getValue = function (path, rootData, currentPath, values) {
        if (values === void 0) { values = {}; }
        if (path === '/') {
            return rootData;
        }
        if (currentPath != null) {
            path = this.resolvePath(path, currentPath);
        }
        if (!Object.getOwnPropertyDescriptor(values, path)) {
            var prop = void 0;
            var parentPath = void 0;
            var parentValue = void 0;
            var index = path.lastIndexOf('/');
            if (index > 0) {
                prop = path.slice(index + 1);
                parentPath = path.slice(0, index);
                parentValue = GateSchema.getValue(parentPath, rootData, null, values);
            }
            else {
                prop = path.slice(1);
                parentValue = rootData;
            }
            if (util_1.isObject(parentValue)) {
                values[path] = parentValue[prop];
            }
        }
        return values[path];
    };
    GateSchema.getSchema = function (path, _a, cb) {
        var _this = this;
        var options = _a.options, rootSchema = _a.rootSchema, rootData = _a.rootData;
        if (path === '/') {
            return cb(rootSchema);
        }
        var keys = path.split('/').slice(1);
        var getChildSchema = function (_a, callback) {
            var childKey = _a.childKey, parentPath = _a.parentPath, schema = _a.schema;
            var j = 0;
            var constraint;
            var keyword;
            var args;
            var getMatchSchema;
            var getChildSchemaOfKeyword;
            var constraints = util_1.getConstraints(schema);
            var constraintsLength = constraints.length;
            var tryNext = function (result) {
                if (!result && j < constraintsLength) {
                    constraint = constraints[j++];
                    if (typeof constraint === 'object') {
                        keyword = constraint.keyword;
                        args = constraint.args;
                    }
                    else {
                        keyword = constraint;
                        args = [];
                    }
                    getMatchSchema = _this._getMatchSchema[keyword];
                    getChildSchemaOfKeyword = _this._getChildSchema[keyword];
                    if (getMatchSchema) {
                        getMatchSchema.call(_this, { path: parentPath, args: args, rootData: rootData, state: state, options: options }, function (matchSchema) {
                            if (matchSchema) {
                                getChildSchema({
                                    childKey: childKey,
                                    parentPath: parentPath,
                                    schema: matchSchema
                                }, tryNext);
                            }
                            else {
                                tryNext();
                            }
                        });
                    }
                    else if (getChildSchemaOfKeyword) {
                        getChildSchemaOfKeyword.call(_this, { args: args, childKey: childKey }, tryNext);
                    }
                    else {
                        tryNext();
                    }
                }
                else {
                    callback(result);
                }
            };
            tryNext();
        };
        var i = 0;
        var currentPath = '';
        var child;
        var length = keys.length;
        var state = {
            mapAllowAdditional: {},
            mapDefinitions: {},
            types: {},
            values: {},
            cache: {}
        };
        var next = function (currentSchema) {
            if (currentSchema) {
                if (i < length) {
                    currentPath += child ? "/" + child : "/";
                    child = keys[i++];
                    getChildSchema({
                        childKey: child,
                        parentPath: currentPath,
                        schema: currentSchema
                    }, next);
                }
                else {
                    cb(Array.isArray(currentSchema)
                        ? new _this({
                            constraints: currentSchema
                        })
                        : currentSchema);
                }
            }
            else {
                cb();
            }
        };
        next(rootSchema);
    };
    GateSchema.extend = function (options) {
        if (options === void 0) { options = {}; }
        var defaultOptions = options.defaultOptions, initConstraints = options.initConstraints, keywords = options.keywords, aliases = options.aliases, msgs = options.msgs;
        var parent = this;
        var GateSchemaExtended = (function (_super) {
            __extends(GateSchemaExtended, _super);
            function GateSchemaExtended() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return GateSchemaExtended;
        }(parent));
        Object.assign(GateSchemaExtended, parent);
        GateSchemaExtended.msgs = Object.create(parent.msgs);
        GateSchemaExtended._validators = Object.create(parent._validators);
        GateSchemaExtended._getChildSchema = Object.create(parent._getChildSchema);
        GateSchemaExtended._getMatchSchema = Object.create(parent._getMatchSchema);
        var proto = GateSchemaExtended.prototype;
        if (defaultOptions) {
            proto.defaultOptions = defaultOptions;
        }
        if (initConstraints) {
            proto.initConstraints = initConstraints;
        }
        if (Array.isArray(keywords)) {
            keywords.forEach(function (item) {
                GateSchemaExtended.addKeyword(item);
            });
        }
        if (Array.isArray(aliases)) {
            aliases.forEach(function (item) {
                GateSchemaExtended.addAlias(item);
            });
        }
        if (msgs) {
            GateSchemaExtended.addMsgs(msgs);
        }
        return GateSchemaExtended;
    };
    GateSchema.getMsg = function (key) {
        return this.msgs[key];
    };
    GateSchema.createError = function (name, value, msgParams, ctx) {
        var constraint = ctx.constraint;
        var errorParams = {
            keyword: name,
            msgParams: msgParams,
            path: ctx.path,
            value: value
        };
        var msg = constraint.msg || this.getMsg(msgParams.KEY);
        errorParams.msg =
            this.formatMsg(msg, msgParams, constraint) || 'invalid value';
        return new this.Error(errorParams);
    };
    GateSchema.formatMsg = function (msg, msgParams, constraint) {
        if (msg && msg.indexOf('${') > -1) {
            msg = msg.replace(/\$\{(.+?)\}/g, function (match, key) {
                return msgParams[key];
            });
        }
        return msg;
    };
    GateSchema.validate = function (value, _a, cb) {
        var _this = this;
        var path = _a.path, rootData = _a.rootData, schema = _a.schema, state = _a.state, _b = _a.options, options = _b === void 0 ? {} : _b;
        var resultCache = getCacheResult(path, schema, state);
        if (resultCache) {
            return cb(resultCache);
        }
        var _c = this, _validators = _c._validators, BREAK = _c.BREAK, VError = _c.Error, _asyncKeywords = _c._asyncKeywords;
        var REMOVE_ADDITIONAL = options.removeAdditional, SKIPS = options.skips, SKIP_ASYNC = options.skipAsync;
        var constraints = util_1.getConstraints(schema);
        var constraintsLength = constraints.length;
        var i = 0;
        var item;
        var args;
        var validator;
        var keyword;
        var result;
        var next = function (err) {
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
                        var msgParams = err === true ? {} : err;
                        if (!msgParams.KEY) {
                            msgParams.KEY = keyword;
                        }
                        result = _this.createError(keyword, value, msgParams, {
                            constraint: item,
                            path: path,
                            rootData: rootData,
                            state: state
                        });
                }
                appendCacheResult(result, path, schema, state);
                cb(result);
            }
            else if (i < constraintsLength) {
                item = constraints[i++];
                keyword = typeof item === 'string' ? item : item.keyword;
                if (SKIP_ASYNC && _asyncKeywords[keyword]) {
                    next();
                }
                args = item.args;
                validator = _validators[keyword];
                if (validator) {
                    validator.call(_this, value, {
                        args: args,
                        path: path,
                        rootData: rootData,
                        state: state,
                        options: options
                    }, next);
                }
                else if (SKIPS && SKIPS.indexOf(keyword) > -1) {
                    next();
                }
                else {
                    cb(new Error("no validator for keyword: " + keyword + ", constraint: " + JSON.stringify(item)));
                }
            }
            else {
                appendCacheResult(null, path, schema, state);
                if (REMOVE_ADDITIONAL) {
                    removeAdditional(path, state);
                }
                cb(null);
            }
        };
        next();
    };
    GateSchema.prototype.add = function (constraint) {
        this.lastConstraintIndex = this.constraints.length;
        this.constraints.push(constraint);
        return this;
    };
    GateSchema.prototype.validate = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var value = arguments[0];
        var options = arguments[1];
        var cb = arguments[2];
        var Ctor = this.constructor;
        if (typeof options === 'function') {
            cb = options;
            options = undefined;
        }
        if (options == null) {
            options = this.defaultOptions;
        }
        var ctx = {
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
            options: options
        };
        if (typeof cb === 'function') {
            Ctor.validate(value, ctx, function (err) {
                cb(err === Ctor.BREAK ? null : err);
            });
        }
        else {
            return new Promise(function (resolve, reject) {
                Ctor.validate(value, ctx, function (err) {
                    err = err === Ctor.BREAK ? null : err;
                    return err ? reject(err) : resolve(err);
                });
            });
        }
    };
    GateSchema.prototype.toJSON = function () {
        return JSON.parse(JSON.stringify(this.constraints));
    };
    GateSchema.BREAK = Symbol('break');
    GateSchema.msgs = {};
    GateSchema._asyncKeywords = {};
    GateSchema._validators = {};
    GateSchema._getMatchSchema = {};
    GateSchema._getChildSchema = {};
    GateSchema.Error = ValidationError_1.default;
    return GateSchema;
}());
GateSchema.prototype.defaultOptions = {};
GateSchema.prototype.initConstraints = [];
exports.default = GateSchema;
//# sourceMappingURL=schemaBase.js.map