import { GateSchema, GateSchemaBaseConstructor } from '../interface';
import { KeywordAlias } from '../interface/index';

const cond = {
  name: 'cond',
  add() {
    return (path: string, whenNotNull: GateSchema, whenNull: GateSchema) => {
      const _ = this.constructor as GateSchemaBaseConstructor;
      return this.switch(path, [
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

const r = {
  name: 'r',
  add() {
    return this.required;
  }
};

const o = {
  name: 'o',
  add() {
    return this.optional;
  }
};

const bool = {
  name: 'bool',
  add() {
    return this.boolean;
  }
};

const num = {
  name: 'num',
  add() {
    return this.number;
  }
};

const str = {
  name: 'str',
  add() {
    return this.string;
  }
};

const bin = {
  name: 'bin',
  add() {
    return this.binary;
  }
};

export default [r, o, bool, num, str, bin, cond];
