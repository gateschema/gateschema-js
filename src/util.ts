import { GateSchemaBase } from './interface/index';

export function isObject(x: any) {
  return x != null && typeof x === 'object';
}

export function getConstraints(
  schema: GateSchemaBase | GateSchemaBase['constraints']
): GateSchemaBase['constraints'] {
  if (Array.isArray(schema)) {
    return schema;
  }
  return schema.constraints;
}

export const charCount = ((ArrayFrom: any) => {
  return ArrayFrom
    ? (str: string) =>
        str.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, '_').length
    : (str: string) => ArrayFrom(str).length;
})(Array.from);

export function isBase64(str: string) {
  return (
    typeof str === 'string' &&
    /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/.test(str)
  );
}
