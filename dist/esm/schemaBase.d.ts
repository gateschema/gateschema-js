import * as I from './interface/index';
import ValidationError from './ValidationError';
declare class GateSchema implements I.GateSchemaBase {
    [key: string]: any;
    static BREAK: symbol;
    static msgs: I.GateSchemaBaseConstructor['msgs'];
    static _asyncKeywords: {
        [ksy: string]: true;
    };
    static _validators: I.GateSchemaBaseConstructor['_validators'];
    static _getMatchSchema: I.GateSchemaBaseConstructor['_getMatchSchema'];
    static _getChildSchema: I.GateSchemaBaseConstructor['_getChildSchema'];
    static Error: typeof ValidationError;
    static addAlias({ name, add }: I.KeywordAlias): void;
    static addKeyword(keyword: I.Keyword, msgs?: I.Msgs): void;
    static createAddFunction(keyword: I.Keyword): (...args: any[]) => any;
    static addMsgs(msgs: I.Msgs): void;
    static resolvePath(targetPath: string, currentPath: string): string;
    static getValue(path: string, rootData: any, currentPath: string | null, values?: I.SchemaValidationCtx['state']['values']): any;
    static getSchema(path: string, { options, rootSchema, rootData }: {
        options: I.ValidationOptions;
        rootSchema: I.GateSchemaBase;
        rootData: any;
    }, cb: any): any;
    static extend<T extends I.GateSchemaBaseConstructor>(options?: {
        defaultOptions?: I.ValidationOptions;
        initConstraints?: I.Constraint[];
        keywords?: I.Keyword[];
        aliases?: I.KeywordAlias[];
        msgs?: I.Msgs;
    }): T;
    static getMsg(key: string): string;
    static createError(name: I.Keyword['name'], value: any, msgParams: I.ValidationErrorMsgParams, ctx: {
        path: string;
        rootData: any;
        state: any;
        constraint: I.Constraint;
    }): ValidationError;
    static formatMsg(msg: string, msgParams: I.ValidationErrorMsgParams, constraint: I.Constraint): string;
    static validate(value: any, { path, rootData, schema, state, options }: I.SchemaValidationCtx, cb: I.ValidationCallback): any;
    constraints: I.Constraint[];
    initConstraints: I.Constraint[];
    defaultOptions: I.ValidationOptions;
    lastConstraintIndex: number;
    constructor(options?: I.GateSchemaBaseConstructArgs[0]);
    add(constraint: I.Constraint): this;
    validate(...args: any[]): any;
    toJSON(): any;
}
export default GateSchema;
