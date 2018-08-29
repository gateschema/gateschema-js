[![Build Status](https://travis-ci.org/gateschema/gateschema-js.svg?branch=master)](https://travis-ci.org/gateschema/gateschema-js)  [![Coverage Status](https://coveralls.io/repos/github/gateschema/gateschema-js/badge.svg)](https://coveralls.io/github/gateschema/gateschema-js)

A small, simple and expressive schema builder and data validator. 


## Features  
* simple and expressive syntax and keywords  
* conditionally constraints  
* supports async validation  
* form generation: [gateschema-form-vue](https://github.com/gateschema/gateschema-form-vue), [gateschema-form-react](https://github.com/gateschema/gateschema-form-react)   
* serialization  

## Quick Start  
```js  
import _ from 'gateschema' 
// Schema creation   
const schema = _
  .required
  .map({
    name: _
      .required
      .string
      .notEmpty,
    password: _
      .required
      .string
      .notEmpty,
    isRemember: _
      .optional
      .boolean
  })

const userInput = {
  // ....
} 

// Data Validation
// callback style
schema.validate(userInput, (err) => {
  if (err) {
    // ...
  }
  // ...
})

// or promise style 
schema
  .validate(userInput)
  .then(() => {
    // ...
  })
  .catch((err) => {
    // ...
  })


// Serialization
console.log(schema.toJSON()) // or JSON.stringify(schema)
```

## Install  
```
npm install gateschema --save  
```

## API  
see [API](docs/api.md)  

- [Keywords](docs/api.md#keywords)
  - [Existance](docs/api.md#existance)
    - [`required`](docs/api.md#required)
    - [`optional`](docs/api.md#optional)
  - [Base Types](docs/api.md#base-types)
    - [`boolean`](docs/api.md#boolean)
    - [`binary`](docs/api.md#binary)
    - [`number`](docs/api.md#number)
    - [`string`](docs/api.md#string)
  - [Complex Types](docs/api.md#complex-types)
    - [`any`](docs/api.md#any)
    - [`enum(definition: {[label: string]: number})`](docs/api.md#enumdefinition-label-string-number)
    - [`enumList(definition: {[label: string]: number})`](docs/api.md#enumlistdefinition-label-string-number)
    - [`list(schema: GateSchema)`](docs/api.md#listschema-gateschema)
    - [`map(definition: {[key:string]: GateSchema})`](docs/api.md#mapdefinition-keystring-gateschema)
    - [`oneOf(schemas: GateSchema[])`](docs/api.md#oneofschemas-gateschema)
    - [`value(value: any)`](docs/api.md#valuevalue-any)
  - [Branching](docs/api.md#branching)
    - [`switch(path: string, cases: {case: GateSchema, schema: GateSchema}[])`](docs/api.md#switchpath-string-cases-case-gateschema-schema-gateschema)
  - [Utils](docs/api.md#utils)
    - [`equal(path: string)`](docs/api.md#equalpath-string)
    - [`format(type: "date" | "date-time" | "hostname" | "uri" | "url" | "email" | "ipv4" | "ipv6")`](docs/api.md#formattype-date--date-time--hostname--uri--url--email--ipv4--ipv6)
    - [`length(range: number | [number] | [undefined, number] | [number, undefined] | [number, number])`](docs/api.md#lengthrange-number--number--undefined-number--number-undefined--number-number)
    - [`max(value: number, isExclusive?: boolean)`](docs/api.md#maxvalue-number-isexclusive-boolean)
    - [`min(value: number, isExclusive?: boolean)`](docs/api.md#minvalue-number-isexclusive-boolean)
    - [`not(schema: GateSchema)`](docs/api.md#notschema-gateschema)
    - [`notEmpty`](docs/api.md#notempty)
    - [`pattern(regex: string | RegExp, flags?: string)`](docs/api.md#patternregex-string--regexp-flags-string)
    - [`unique`](docs/api.md#unique)
  - [Other](docs/api.md#other)
    - [`allowAdditional`](docs/api.md#allowadditional)
    - [`other(...args: any[])`](docs/api.md#otherargs-any)
- [Methods](docs/api.md#methods)
    - [`validate(...args: any[]): any`](docs/api.md#validateargs-any-any)
    - [`toJSON(): Constraint[]`](docs/api.md#tojson-constraint)
    - [`$clone(options?: {pick?: string[], omit?: string[]}): GateSchema`](docs/api.md#cloneoptions-pick-string-omit-string-gateschema)
    - [`$keys(): string[]`](docs/api.md#keys-string)
    - [`$get(...args: any[]): GateSchema`](docs/api.md#getargs-any-gateschema)
    - [`$msg`](docs/api.md#msg)
- [Static Methods](docs/api.md#static-methods)
    - [`addMsgs(msgs: Msgs): void`](docs/api.md#addmsgsmsgs-msgs-void)
    - [`addKeyword(keyword: Keyword, msgs?: Msgs): void`](docs/api.md#addkeywordkeyword-keyword-msgs-msgs-void)
    - [`addAlias(alias: KeywordAlias): void`](docs/api.md#addaliasalias-keywordalias-void)
    - [`extend<T extends this>(options?: Options): T`](docs/api.md#extendt-extends-thisoptions-options-t)

## Q&A  
### Custom messages and i18n  
see [`$msg`](docs/api.md#msg) and [`addMsgs`](docs/api.md#addmsgsmsgs-msgs-void)

### Require fields conditionally  
```js  
const schema = _
  .map({
    employed: _
      .optional
      .boolean
  })
  .switch('/employed', [
    {
      // if `employed` is true
      case: _
        .value(true), 
      // then the input shoud be a map containing `employee` key
      schema: _ 
        .map({
          employee: _
            .required
            .string
        })
    }
  ])
```
### One of a field is required  
```js
const schema = _
  .required
  .map({
    email: _
      .switch('/phone', [
        {
          case: _.required, // if `phone` satisfy `_.required`
          schema: _.optional // then `email` is optional
        },
        {
          case: _.any, // else 
          schema: _.required.$msg('Please input email or phone') // `email` is required
        }
      ])
      .string
      .format('email'),
    phone: _
      .switch('/email', [
        {
          case: _.required,
          schema: _.optional
        },
        {
          case: _.any,
          schema: _.required.$msg('Please input email or phone')
        }
      ])
      .string
  })
```
Another way  
```js
const schema = _
  .required
  .map({
    email: _
      .optional
      .string
      .format('email'),
    phone: _
      .optional
      .string
  })
  .oneOf([
    _.map({
      email: _.required
    }),
    _.map({
      phone: _.required
    })
  ])
  .$msg('Please input email or phone')
```

## Changelog  
See [CHANGELOG](./CHANGELOG.md)

## License  
MIT