import { Keyword } from '../interface/index';

// Existance
import optional from './optional';
import required from './required';

// Base Types
import binary from './binary';
import boolean from './boolean';
import number from './number';
import string from './string';

// Complex Types
import any from './any';
import enum_ from './enum';
import enumList from './enumList';
import list from './list';
import map_ from './map';
import oneOf from './oneOf';
import value from './value';

// Branching
import keywordSwitch from './switch';

// util
import equal from './equal';
import format from './format';
import len from './len';
import length from './length';
import max from './max';
import min from './min';
import not from './not';
import notEmpty from './notEmpty';
import pattern from './pattern';
import unique from './unique';

// Other
import allowAdditional from './allowAdditional';
import other from './other';

export default [
  required,
  optional,

  boolean,
  number,
  string,
  binary,
  map_,
  list,
  oneOf,
  any,

  enum_,
  enumList,
  value,
  format,
  pattern,

  length,
  len,
  min,
  max,

  unique,

  not,
  notEmpty,
  equal,

  keywordSwitch,

  allowAdditional,
  other
] as Keyword[];
