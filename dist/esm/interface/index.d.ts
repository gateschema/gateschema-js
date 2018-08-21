export declare type Constraint = ConstraintString | ConstraintObject | ConstraintHighOrder;
export declare type ConstraintString = string;
export interface ConstraintObject {
    keyword: string;
    msg?: string;
}
export interface ConstraintHighOrder extends ConstraintObject {
    args: any[];
}
export declare type ValidationResultCacheItem = [Constraint[], any];
export interface ValidationState {
    types: {
        [key: string]: any;
    };
    values: {
        [key: string]: any;
    };
    mapAllowAdditional: {
        [key: string]: boolean;
    };
    mapDefinitions: {
        [key: string]: object[];
    };
    cache: {
        [key: string]: ValidationResultCacheItem[];
    };
}
export interface ValidationCtx {
    path: string;
    rootData: any;
    state: ValidationState;
    options?: ValidationOptions;
}
export interface ValidationCtxHighOrder extends ValidationCtx {
    args: any[];
}
export interface SchemaValidationCtx extends ValidationCtx {
    schema: Constraint[] | GateSchemaBase;
}
export interface Msgs {
    [key: string]: string;
}
export interface KeywordValidationCtx {
    path: string;
    rootData: any;
    state: ValidationState;
    options?: any;
}
export interface Keyword {
    name: string;
    isHighOrder?: boolean;
    isAsync?: boolean;
    add?: (...args: any[]) => any;
    msg?: string | {
        [msgKey: string]: string;
    };
    validator: (value: any, ctx: ValidationCtx | ValidationCtxHighOrder, cb: (err?: any) => any) => void;
    getChildSchema?: (options: {
        args: any;
        childKey: string;
    }, cb: (schema?: GateSchemaBase) => any) => any;
    getMatchSchema?: (options: {
        path: string;
        args: any;
        rootData: any;
        state: ValidationState;
    }, cb: (schema?: GateSchemaBase) => any) => any;
}
export interface KeywordAlias {
    name: Keyword['name'];
    add: () => this | ((...args: any[]) => this);
}
export declare type ValidateBreak = symbol;
export declare type ValidateResult = undefined | ValidationError | ValidateBreak;
export declare type ValidationCallback = (err?: null | ValidationError | Error) => any;
export interface ValidateErrorConstructor {
    new (options: ValidationError): ValidationError;
}
export interface ValidationErrorMsgParams {
    KEY: string;
    [key: string]: any;
}
export interface ValidationError {
    path: string;
    msg: string;
    keyword: string;
    value: any;
    msgParams: ValidationErrorMsgParams;
}
export interface GateSchemaBaseConstructArgs {
    0: undefined | {
        constraints?: Constraint[];
    };
}
export interface GateSchemaBaseConstructor {
    BREAK: ValidateBreak;
    Error: ValidateErrorConstructor;
    _asyncKeywords: {
        [ksy: string]: true;
    };
    _getMatchSchema: {
        [key: string]: any;
    };
    _getChildSchema: {
        [key: string]: any;
    };
    _validators: {
        [key: string]: Keyword['validator'];
    };
    msgs: {
        [key: string]: string;
    };
    new (options: GateSchemaBaseConstructArgs[0]): GateSchemaBase;
    (options: GateSchemaBaseConstructArgs[0]): GateSchemaBase;
    getMsg(key: string): string;
    createError(name: Keyword['name'], value: any, detail: {
        [key: string]: string;
    }, ctx: {
        path: string;
        rootData: any;
        state: ValidationState;
        constraint: Constraint;
    }): ValidationError;
    formatMsg(msg: string, detail: ValidationErrorMsgParams, constraint: Constraint): string;
    resolvePath(targetPath: string, currentPath: string): string;
    getValue(id: string, data: any, currentPath: string, values: SchemaValidationCtx['state']['values']): any;
    getSchema(path: string, options: {
        rootSchema: GateSchemaBase;
        rootData?: object | undefined;
        options?: ValidationOptions;
    }, cb: (Schema?: GateSchemaBase) => any): void;
    addAlias(alias: KeywordAlias): void;
    addKeyword(keyword: Keyword, msgs?: Msgs): void;
    addMsgs(msgs: Msgs): void;
    extend<T extends this>(options?: {
        defaultOptions?: ValidationOptions;
        initConstraints?: Constraint[];
        keywords?: Keyword[];
        aliases?: KeywordAlias[];
        msgs?: Msgs;
    }): T;
    validate(value: any, ctx: SchemaValidationCtx, cb: ValidationCallback): void;
    createAddFunction(keyword: Keyword): () => any;
    [key: string]: any;
}
export interface ValidationOptions {
    removeAdditional?: boolean;
    skipAsync?: boolean;
    skips?: string[];
}
export interface GateSchemaBase {
    constraints: Constraint[];
    lastConstraintIndex: number;
    defaultOptions: ValidationOptions;
    initConstraints: Constraint[];
    add(constraint: Constraint): GateSchemaBase;
    validate(...args: any[]): any;
    validate(value: any, cb: ValidationCallback): void;
    validate(value: any, options: ValidationOptions, cb: ValidationCallback): void;
    validate(value: any, options?: ValidationOptions): Promise<null | ValidationError | Error>;
    toJSON(): Constraint[];
    [key: string]: any;
}
export interface GateSchemaKeywords {
    required: GateSchema;
    optional: GateSchema;
    boolean: GateSchema;
    binary: GateSchema;
    number: GateSchema;
    string: GateSchema;
    any: GateSchema;
    enum(definition: {
        [key: string]: number;
    }): GateSchema;
    enumList(definition: {
        [key: string]: number;
    }): GateSchema;
    list(schema: GateSchema): GateSchema;
    map(definition: {
        [key: string]: GateSchema;
    }): GateSchema;
    oneOf(schemas: GateSchema[]): GateSchema;
    value(value: any): GateSchema;
    switch(path: string, cases: Array<{
        case: GateSchema;
        schema: GateSchema;
    }>): GateSchema;
    not(schema: GateSchema): GateSchema;
    equal(path: string): GateSchema;
    format(type: 'date' | 'date-time' | 'hostname' | 'uri' | 'url' | 'email' | 'ipv4' | 'ipv6'): GateSchema;
    length(range: number | [number] | [undefined, number] | [number, undefined] | [number, number]): GateSchema;
    notEmpty: GateSchema;
    pattern(regex: string | RegExp, flags?: string): GateSchema;
    unique: GateSchema;
    allowAdditional: GateSchema;
    other(...args: any[]): GateSchema;
}
export declare type GetSchemaCallback = (_: GateSchema) => any;
export interface GateSchema extends GateSchemaKeywords, GateSchemaBase {
    $get(...args: any[]): any;
    $get(path: string, cb: GetSchemaCallback): any;
    $get(path: string, rootData: any, cb: GetSchemaCallback): any;
    $get(path: string, rootData: any, validationOptions: ValidationOptions, cb: GetSchemaCallback): any;
}
export interface GateSchemaConstructor extends GateSchemaKeywords, GateSchemaBaseConstructor {
}
