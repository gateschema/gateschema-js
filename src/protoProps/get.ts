import {
  GateSchemaBaseConstructor,
  GetSchemaCallback,
  ValidationOptions
} from '../interface/index';

export default function $get(
  path: string,
  rootData: any,
  validationOptions: ValidationOptions,
  cb: GetSchemaCallback
): void {
  if (typeof rootData === 'function') {
    cb = rootData;
    rootData = undefined;
  } else if (typeof validationOptions === 'function') {
    cb = validationOptions;
    validationOptions = {};
  }
  (this.constructor as GateSchemaBaseConstructor).getSchema(
    path,
    {
      rootData,
      options: validationOptions,
      rootSchema: this
    },
    cb
  );
  return this;
}
