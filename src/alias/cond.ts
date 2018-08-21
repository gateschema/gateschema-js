import {
  GateSchema,
  GateSchemaBaseConstructor,
  KeywordAlias
} from '../interface/index';

export default {
  name: 'cond',
  add() {
    return (path: string, whenNotNull: GateSchema, whenNull: GateSchema) => {
      const _ = this.constructor as GateSchemaBaseConstructor;
      return _.switch(path, [
        {
          case: _.required,
          schema: whenNotNull
        },
        {
          case: _.any,
          schema: whenNull || _.any
        }
      ]);
    };
  }
} as KeywordAlias;
