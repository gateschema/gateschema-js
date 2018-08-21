import { GateSchemaBase } from './interface/index';
export declare function isObject(x: any): boolean;
export declare function getConstraints(schema: GateSchemaBase | GateSchemaBase['constraints']): GateSchemaBase['constraints'];
export declare const charCount: (str: string) => any;
export declare function isBase64(str: string): boolean;
