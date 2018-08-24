
<!-- TOC -->

- [Keywords](#keywords)
  - [Existance](#existance)
    - [`required`](#required)
    - [`optional`](#optional)
  - [Base Types](#base-types)
    - [`boolean`](#boolean)
    - [`binary`](#binary)
    - [`number`](#number)
    - [`string`](#string)
  - [Complex Types](#complex-types)
    - [`any`](#any)
    - [`enum(definition: {[label: string]: number})`](#enumdefinition-label-string-number)
    - [`enumList(definition: {[label: string]: number})`](#enumlistdefinition-label-string-number)
    - [`list(schema: GateSchema)`](#listschema-gateschema)
    - [`map(definition: {[key:string]: GateSchema})`](#mapdefinition-keystring-gateschema)
    - [`oneOf(schemas: GateSchema[])`](#oneofschemas-gateschema)
    - [`value(value: any)`](#valuevalue-any)
  - [Branching](#branching)
    - [`switch(path: string, cases: {case: GateSchema, schema: GateSchema}[])`](#switchpath-string-cases-case-gateschema-schema-gateschema)
  - [Utils](#utils)
    - [`equal(path: string)`](#equalpath-string)
    - [`format(type: "date" | "date-time" | "hostname" | "uri" | "url" | "email" | "ipv4" | "ipv6")`](#formattype-date--date-time--hostname--uri--url--email--ipv4--ipv6)
    - [`length(range: number | [number] | [undefined, number] | [number, undefined] | [number, number])`](#lengthrange-number--number--undefined-number--number-undefined--number-number)
    - [`not(schema: GateSchema)`](#notschema-gateschema)
    - [`notEmpty`](#notempty)
    - [`pattern(regex: string | RegExp, flags?: string)`](#patternregex-string--regexp-flags-string)
    - [`unique`](#unique)
  - [Other](#other)
    - [`allowAdditional`](#allowadditional)
    - [`other(...args: any[])`](#otherargs-any)
- [Methods](#methods)
    - [`validate(...args: any[]): any`](#validateargs-any-any)
    - [`toJSON(): Constraint[]`](#tojson-constraint)
    - [`$clone(options?: {pick?: string[], omit?: string[]}): GateSchema`](#cloneoptions-pick-string-omit-string-gateschema)
    - [`$keys(): string[]`](#keys-string)
    - [`$get(...args: any[]): GateSchema`](#getargs-any-gateschema)
    - [`$msg`](#msg)
- [Static Methods](#static-methods)
    - [`addMsgs(msgs: Msgs): void`](#addmsgsmsgs-msgs-void)
    - [`addKeyword(keyword: Keyword, msgs?: Msgs): void`](#addkeywordkeyword-keyword-msgs-msgs-void)
    - [`addAlias(alias: KeywordAlias): void`](#addaliasalias-keywordalias-void)
    - [`extend<T extends this>(options?: Options): T`](#extendt-extends-thisoptions-options-t)

<!-- /TOC -->

## Keywords  

### Existance
#### `required`   
Expect the input value to neither be `undefined` nor `null`  

Alias `r`

Example  
```js
const schema = _.required

schema.validate('anything not null', (err) => {
  console.log(err)
  // null
})

schema.validate(null, (err) => {
  console.log(err)
  // ValidationError {
  //   keyword: 'required',
  //   msgParams: { KEY: 'required' },
  //   path: '/',
  //   value: null,
  //   msg: 'should not be null or undefined' }
})
```

#### `optional`
The input value can be `undefined` or `null`

Alias `o`

Example  
```js
const schema = _.optional

schema.validate(true, (err) => {
  console.log(err)
  // null
})

schema.validate(null, (err) => {
  console.log(err)
  // null
})

```

### Base Types
#### `boolean`
Expect the input value to be `true` or `false`

Alias `bool`

Example  

```js
const schema = _.boolean

schema.validate(false, (err) => {
  console.log(err)
  // null
})

schema.validate(1, (err) => {
  console.log(err)
  // ValidationError {
  //   keyword: 'boolean',
  //   msgParams: { KEY: 'boolean' },
  //   path: '/',
  //   value: 1,
  //   msg: 'should be true or false' }
})
```

#### `binary`  
Expect the input value to be a `ArrayBuffer` or base64 `string`

Alias `bin`

Example  
```js  
const schema = _.binary

// ArrayBuffer
schema.validate(new ArrayBuffer(8), (err) => {
  console.log(err)
  // null
})

// base64 
schema.validate('aGVsbG8=', (err) => {
  console.log(err)
  // null
})

schema.validate('foo', (err) => {
  console.log(err)
  // ValidationError {
  //   keyword: 'binary',
  //   msgParams: { KEY: 'binary' },
  //   path: '/',
  //   value: 'foo',
  //   msg: 'should be binary' }
})
```

#### `number`   
Expect the input value to be a `number` or numeric `string`  

Alias `num`  

Example  
```js
const schema = _.number

schema.validate(123, (err) => {
  console.log(err)
  // null
})

schema.validate('9007199254740995', (err) => {
  console.log(err)
  // null
})

schema.validate('abc', (err) => {
  console.log(err)
  // ValidationError {
  //   keyword: 'number',
  //   msgParams: { KEY: 'number' },
  //   path: '/',
  //   value: 'abc',
  //   msg: 'should be a number' }
})
```

#### `string`  
Expect the input value to be a `string`  

Alias `str`  

Example  
```js  
const schema = _.string

schema.validate('123', (err) => {
  console.log(err)
  // null
})

schema.validate(123, (err) => {
  console.log(err)
  // ValidationError {
  //   keyword: 'string',
  //   msgParams: { KEY: 'string' },
  //   path: '/',
  //   value: 123,
  //   msg: 'should be a string' }
})

```

### Complex Types  
#### `any`
The input value can be anything

Example   
```js
const schema = _.any

schema.validate(null, (err) => {
  console.log(err)
  // null
})

schema.validate(false, (err) => {
  console.log(err)
  // null
})

schema.validate(1, (err) => {
  console.log(err)
  // null
})
```

#### `enum(definition: {[label: string]: number})`
Expect the input value to be one of the defined values

Example  
```js
const schema = _.enum({
  NAME: 1,
  MOBILE: 2
})

schema.validate(1, (err) => {
  console.log(err)
  // null
})

schema.validate(3, (err) => {
  console.log(err)
  // ValidationError {
  //   keyword: 'enum',
  //   msgParams: { keys: '["NAME","MOBILE"]', values: '[1,2]', KEY: 'enum' },
  //   path: '/',
  //   value: 3,
  //   msg: 'should be one of [1,2]' }
})
```

#### `enumList(definition: {[label: string]: number})`
Expect the input value to be a list of the defined values


Example  
```js
const schema = _.enumList({
  NAME: 1,
  MOBILE: 2
})

schema.validate([1,2], (err) => {
  console.log(err)
  // null
})

schema.validate([3], (err) => {
  console.log(err)
  // ValidationError {
  //   keyword: 'enumList',
  //   msgParams: { keys: [ 'NAME', 'MOBILE' ], values: [ 1, 2 ], KEY: 'enumList' },
  //   path: '/',
  //   value: [ 3 ],
  //   msg: 'should be a list only containing these values: 1,2' }

})
```


#### `list(schema: GateSchema)`
Expect the input value to be a list of values that satisfy the passing schema

Example  
```js 
const schema = _.list(_.number)

schema.validate([1,2,3], (err) => {
  console.log(err)
  // null
})

schema.validate(['a', 'b'], (err) => {
  console.log(err)
  // ValidationError {
  //   keyword: 'number',
  //   msgParams: { KEY: 'number' },
  //   path: '/0',
  //   value: 'a',
  //   msg: 'should be a number' }
})
```

#### `map(definition: {[key:string]: GateSchema})`
Expect the input value to be a map with keys and values that satisfy the definition 

Example  
```js
const schema = _.map({
  name: _.required.string,
  password: _.required.string
})

schema.validate({
  name: 'foo',
  password: 'bar'
}, (err) => {
  console.log(err)
  // null
})

schema.validate({
  name: 'foo',
}, (err) => {
  console.log(err)
  // ValidationError {
  //   keyword: 'required',
  //   msgParams: { KEY: 'required' },
  //   path: '/password',
  //   value: undefined,
  //   msg: 'should not be null or undefined' }
})
```


#### `oneOf(schemas: GateSchema[])`
Expect the input value to satisfy one of the passing schemas

Example  
```js
const schema = _.oneOf([
  _.number,
  _.string
])

schema.validate(123, (err) => {
  console.log(err)
  // null
})

schema.validate('abc', (err) => {
  console.log(err)
  // null
})

schema.validate(true, (err) => {
  console.log(err)
  // ValidationError {
  //   keyword: 'oneOf',
  //   msgParams: { KEY: 'oneOf' },
  //   path: '/',
  //   value: true,
  //   msg: 'invalid value' }
})

```

#### `value(value: any)`
Expect the input value is the passing value

Example  
```js
const schema = _.value(1)

schema.validate(1, (err) => {
  console.log(err)
  // null
})

schema.validate('1', (err) => {
  console.log(err)
  // ValidationError {
  //   keyword: 'value',
  //   msgParams: { KEY: 'value' },
  //   path: '/',
  //   value: '1',
  //   msg: 'should be 1' }
})

```

### Branching
#### `switch(path: string, cases: {case: GateSchema, schema: GateSchema}[])`
Expect the input value to satisfy a schema depends on the value of the passing `path` and the cases  
If there is no matching case, it will pass  
If you want a default case, you can use the `any` keyword  

Example  
```js
const schema = _.required.map({
 type: _.required.enum({
    NAME: 1,
    MOBILE: 2
  })
}).switch('/type', [
  {
    case: _.value(1),
    schema: _.map({
      username: _.required.string,
      password: _.required.string
    })
  },
  {
    case: _.value(2),
    schema: _.map({
      mobile: _.required.number,
      captcha: _.required.number
    })
  },
  // if you want a default case, use `any` 
  // {
  //   case: _.any,
  //   schema: _.map({
  //     username: _.required.string,
  //     password: _.required.string
  //   })
  // }
])

schema.validate({
  type: 1,
  username: 'foo',
  password: 'bar'
}, (err) => {
  console.log(err)
  // null
})

schema.validate({
  type: 2,
  mobile: '123456'
}, (err) => {
  console.log(err)
  // ValidationError {
  //   keyword: 'required',
  //   msgParams: { KEY: 'required' },
  //   path: '/captcha',
  //   value: undefined,
  //   msg: 'should not be null or undefined' }
})

```

### Utils  
#### `equal(path: string)`
Expect the input value to be equal to the value of the passing `path`  

Example  
```js
const schema = _.map({
  password: _.required.string,
  repassword: _.required.equal('/password')
})

schema.validate({
  password: '123456',
  repassword: '123'
}, (err) => {
  console.log(err)
  // ValidationError {
  //   keyword: 'equal',
  //   msgParams: { id: '/password', KEY: 'equal' },
  //   path: '/repassword',
  //   value: '123',
  //   msg: 'should equal to the value of /password' }
})

```
#### `format(type: "date" | "date-time" | "hostname" | "uri" | "url" | "email" | "ipv4" | "ipv6")` 
Expect the input value to be in the passing format  

* date: see full-date in https://tools.ietf.org/html/rfc3339#section-5.6, examples:  
  * 1990-12-31  
  * 2018-07-28   
* date-time: see date-time in https://tools.ietf.org/html/rfc3339#section-5.6, examples: 
  * 1990-12-31T15:59:59+02:00
  * 1990-12-31T15:59:59-08:00
  * 2017-07-21T17:32:28Z
* hostname: examples:  
  * github.com
  * a-n-y.sub.123.domain
  * localhost
  * 8.8.8.8
* uri: expamles:  
  * https://github.com
  * https://github.com/gateschema
  * https://github.com:443/gateschema?query=any
  * schema://path:port?query'
* url: examples:  
  * ftp://github.com
  * http://github.com/gateschema
  * https://github.com:443/gateschema?query=any
* email: see http://www.w3.org/TR/html5/forms.html#valid-e-mail-address, examples:  
  * test@github.com
  * test@localhost
  * 123@github.com
  * t12@github.com
* ipv4: examples:  
  * 8.8.8.8
  * 192.168.1.1
* ipv6: examples: 
  * 2001:0db8:0000:0000:0000:ff00:0042:1234
  * 2001:db8:0:0:0:ff00:42:5678
  * 2001:db8::ff00:42:8765

Examples  
```js
const schema = _.format('date')

schema.validate('2018-07-30', (err) => {
  console.log(err)
  // null
})

schema.validate('2018/07/30', (err) => {
  console.log(err)
  // ValidationError {
  //   keyword: 'format',
  //   msgParams: { format: 'date', KEY: 'format' },
  //   path: '/',
  //   value: '2018/07/30',
  //   msg: 'invalid date format' }
})
```

#### `length(range: number | [number] | [undefined, number] | [number, undefined] | [number, number])`
`range` can be a `number` or an array `[min?: number, max?: number]`  
If the input value is a `string`, expect it to contain `range` characters.  
If the input value is a `list`, expect it to contain `range` elements.  
If the input value is a `binary`, expect it to contain `range` bytes.  

Example  
```js  
const schema = _.binary.length(2)

schema.validate(new ArrayBuffer(2), (err) => {
  console.log(err)
  // null
})

// btoa(String.fromCharCode.apply(null, new Uint8Array(2)))
schema.validate('AAA=', (err) => {
  console.log(err)
  // null
})

schema.validate(new ArrayBuffer(1), (err) => {
  console.log(err)
  // ValidationError {
  //   keyword: 'length',
  //   msgParams:
  //    { KEY: 'length_binary_match',
  //      length: 2,
  //      maxLength: undefined,
  //      minLength: undefined,
  //      valueLength: 1 },
  //   path: '/',
  //   value: ArrayBuffer { byteLength: 1 },
  //   msg: 'should contain 2 bytes' }
})
```

```js
const schema = _.binary.length([3])

schema.validate(new ArrayBuffer(4), (err) => {
  console.log(err)
  // null
})

schema.validate(new ArrayBuffer(2), (err) => {
  console.log(err)
  // ValidationError {
  //   keyword: 'length',
  //   msgParams:
  //    { KEY: 'length_binary_min',
  //      length: undefined,
  //      maxLength: undefined,
  //      minLength: 3,
  //      valueLength: 2 },
  //   path: '/',
  //   value: ArrayBuffer { byteLength: 2 },
  //   msg: 'should contain at least 3 bytes' }
})
```

```js
const schema = _.binary.length([undefined,3])

schema.validate(new ArrayBuffer(4), (err) => {
  console.log(err)
  // ValidationError {
  //   keyword: 'length',
  //   msgParams:
  //    { KEY: 'length_binary_max',
  //      length: undefined,
  //      maxLength: 3,
  //      minLength: undefined,
  //      valueLength: 4 },
  //   path: '/',
  //   value: ArrayBuffer { byteLength: 4 },
  //   msg: 'should contain at most 3 bytes' }
})

schema.validate(new ArrayBuffer(2), (err) => {
  console.log(err)
  // null
})
```

```js
const schema = _.binary.length([2,3])

schema.validate(new ArrayBuffer(4), (err) => {
  console.log(err)
  // ValidationError {
  //   keyword: 'length',
  //   msgParams:
  //    { KEY: 'length_binary_range',
  //      length: undefined,
  //      maxLength: 3,
  //      minLength: 2,
  //      valueLength: 4 },
  //   path: '/',
  //   value: ArrayBuffer { byteLength: 4 },
  //   msg: 'should contain 2 to 3 bytes' }
})

schema.validate(new ArrayBuffer(2), (err) => {
  console.log(err)
  // null
})
```

#### `not(schema: GateSchema)`  
Expect the input value do not satisfy the passing schema  


#### `notEmpty`
Expect the input value to neither be `0`, `''`, `list` without elements nor `map` without any key

Example  
```js  
const schema = _.string.notEmpty  

schema.validate('a', (err) => {
  console.log(err)
  // null
})

schema.validate('', (err) => {
  console.log(err)
  // ValidationError {
  //   keyword: 'notEmpty',
  //   msgParams: { KEY: 'notEmpty' },
  //   path: '/',
  //   value: '',
  //   msg: 'should not be empty' }
})

```

#### `pattern(regex: string | RegExp, flags?: string)`
Expect the input to match the passing pattern

Expample  
```js
const schema = _.pattern(/^\d+/)

schema.validate('123', (err) => {
  console.log(err)
  // null
})

schema.validate('abc', (err) => {
  console.log(err)
  // ValidationError {
  //   keyword: 'pattern',
  //   msgParams: { KEY: 'pattern' },
  //   path: '/',
  //   value: 'abc',
  //   msg: 'invalid format' }
})
```

#### `unique`
Expect each element in the `list` is unique  

Example  
```js
const schema = _.list(_.number).unique

schema.validate([1,2,3], (err) => {
  console.log(err)
  // null
})

schema.validate([1,1,3], (err) => {
  console.log(err)
  // ValidationError {
  //   keyword: 'unique',
  //   msgParams: { KEY: 'unique' },
  //   path: '/',
  //   value: [ 1, 1, 3 ],
  //   msg: 'each item should be unique' }
})
```

### Other  
#### `allowAdditional`
If passing the option `removeAdditional` as `true` to the `validate` method, the additional keys of the `map` will be removed unless it has an `allowAdditional` constraint

Example  
```js
const schema = _.map({
  name: _.string,
  password: _.string
})

const input = {
  name: 'foo',
  password: 'bar',
  email: 'addition@email.com'
}

// the additional email won't be removed
schema.validate(input, (err) => {
  console.log(err)
  // null
  console.log(input.email)
  // 'addition@email.com'
})

// email will be remove as we passing 'removeAdditional=true'
schema.validate(input, {removeAdditional: true}, (err) => {
  console.log(err)
  // null
  console.log(input.email)
  // undefined
})

const schemaAllowAddition = _.map({
  name: _.string,
  password: _.string
}).allowAdditional

const inputWithAdditional = {
  name: 'foo',
  password: 'bar',
  email: 'addition@email.com'
}
// email won't be removed
schemaAllowAddition.validate(inputWithAdditional, {removeAdditional: true}, (err) => {
  console.log(err)
  // null
  console.log(inputWithAdditional.email)
  // addition@email.com
})

```


#### `other(...args: any[])`
This is used to store infomation for any other purpose, such as generating data, ui rendering

Example  
```js  
const schema = _.map({
  name: _ .required .string .other('ui', {label: 'User Name', component: 'Input'}),
  password: _. required. string. other('ui', {label: 'Password', component: 'Input', type: 'password'})
})
```

## Methods  
#### `validate(...args: any[]): any`    
  * `validate(value: any, cb: ValidationCallback): void`
  * `validate(value: any, options: ValidationOptions, cb: ValidationCallback): void`
  * `validate(value: any, options?: ValidationOptions): Promise<null|ValidationError|Error>`

Both callback style or async/await style are available  
**NB: A schema may contain sync constraint or async constraint, so the validation progress may be synchronous and the callback will be called synchronously**

Expamle  
```js
const schema = _.map({
  name: _.required.string,
  password: _.required.string
})

const input = {
  name: 'foo',
  password: 'bar',
  email: 'addition@email.com'
}

schema.validate(input, (err) => {
  console.log(err)
  // null
  console.log(input.email)
  // addition@email.com
})

schema.validate(input).then(err => {
  console.log(err)
  // null
  console.log(input.email)
  // addition@email.com
})
```

```js

const schema = _.map({
  name: _.required.string,
  password: _.required.string
})

const input = {
  name: 'foo',
  password: 'bar',
  email: 'addition@email.com'
}

schema.validate(input, {removeAdditional: true}).then(err => {
  console.log(err)
  // null
  console.log(input.email)
  // undefined
})

```

Interfaces

* ValidationOptions   
```ts  
type ValidationOptions = {
  removeAdditional?: boolean,
  skipAsync?: boolean,
  skips?: boolean
}
```

* ValidationCallback   
```ts
type ValidationCallback = (err?: null | ValidationError | Error) => any
```

* ValidationError  
```ts 
interface ValidationErrorMsgParams {
  KEY: string
  [key: string]: any
}  

interface ValidationError {
  keyword: string
  msg: string
  msgParams: ValidationErrorMsgParams
  path: string
  value: any
}  

```  

#### `toJSON(): Constraint[]`  
Serialize the schema to JSON object

Example  
```js
const schema = _.map({
  name: _.required.string,
  password: _.required.string
})

console.log(JSON.stringify(schema))
// the same as
// console.log(schema.toJSON())

// [
//   {
//     "args":[
//       {
//         "name":["required","string"],
//         "password":["required","string"]
//       }
//     ],
//    "keyword":"map"
//   }
// ]


// deserialize
const s = new _({constraints: JSON.parse(JSON.stringify(schema))})

s.validate({
  name: 'foo'
}, (err) => {
  console.log(err)
  // ValidationError {
  //   keyword: 'required',
  //   msgParams: { KEY: 'required' },
  //   path: '/password',
  //   value: undefined,
  //   msg: 'should not be null or undefined' }
})

```

Interfaces
```ts
type Constraint = ConstraintString | ConstraintObject | ConstraintHighOrder
type ConstraintString =  string
interface ConstraintObject {
  keyword: string,
  msg?: string
}
interface ConstraintHighOrder extends ConstraintObject{
  args: any[]
}

```
#### `$clone(options?: {pick?: string[], omit?: string[]}): GateSchema`  
Clone a schema and pick or omit some keys of the `map` constraints

Example  
```js
const schema = _.map({
  _id: _.required.string,
  name: _.required.string,
  password: _.required.string,
  repassword: _.equal('/password')
})

const schemaForCreateItem = schema.$clone({omit: ['_id']})
schemaForCreateItem.validate({
  name: 'foo',
  password: 'bar',
  repassword: 'bar'
}, err => {
  console.log(err)
  // null
})

const schemaForReadItem = schema.$clone({pick: ['_id']})
schemaForReadItem.validate({
  _id: 'uid-of-item'
}, err => {
  console.log(err)
  // null
})
```

#### `$keys(): string[]`  
Get the keys of the `map` constraints  

```js  
const schema = _.required.map({
  _id: _.required.string,
  email: _.optional.string,
  mobile: _.optional.number
}).switch('/email', [
  {
    case: _.required,
    schema: _.map({
      password: _.required
    })
  }
]).switch('/mobile', [
  {
    case: _.required,
    schema: _.map({
      captcha: _.required
    })
  }
]).map({
  isRememberMe: _.optional.boolean
})

console.log(schema.$keys())
// [ '_id', 'email', 'mobile', 'password', 'captcha', 'isRememberMe' ]
```

#### `$get(...args: any[]): GateSchema`  
  * `$get(path: string, cb: (schemaOfThePath: GateSchema) => void): GateSchema`
  * `$get(path: string, rootData: any, cb: (schemaOfThePath: GateSchema) => void): GateSchema`
  * `$get(path: string, rootData: any, validationOptions: ValidationOptions, cb: (schemaOfThePath: GateSchema) => void): GateSchema`

Get the schema of the passing path. Useful for changing the schema dynamically.

Example  
```js  
const schema = _.required.map({
  type: _.required.enum({
    EMAIL: 1,
    MOBILE: 2
  })
}).switch('/type', [
  {
    case: _.value(1),
    schema: _.map({
      email: _.required.string
    })
  },
  {
    case: _.value(2),
    schema: _.map({
      mobile: _.required.number,
    })
  }
])

schema
  .$get('/type', (_) => {
    _.other({
      label: 'Choose Type'
    })
  })
  .$get('/email', (_) => {
    // this will get nothing, since we didn't select one case, see below
    console.log(_)
    // undefined
  })
  // passing {type:1} to select the case
  .$get('/email', {type: 1}, (_) => {
    console.log(_)
    // GateSchemaExtended { constraints: [ 'required', 'string' ] }

    _.format('email').other('ui', {label: 'Email'})
  })
```

#### `$msg`    
Set the error message of the last added constraint  

Example  
```js   
const schema = _.map({
  name: _ .required.$msg('Please input the User Name')
          .string
          .length([6,16]).$msg('User Name should contain 6 to 16 characters')
})

schema.validate({}, err => {
  console.log(err)
  // ValidationError {
  //   keyword: 'required',
  //   msgParams: { KEY: 'required' },
  //   path: '/name',
  //   value: undefined,
  //   msg: 'Please input the User Name }
})

schema.validate({name: 'foo'}, err => {
  console.log(err)
  // ValidationError {
  //   keyword: 'length',
  //   msgParams:
  //    { KEY: 'length_string_range',
  //      length: undefined,
  //      maxLength: 16,
  //      minLength: 6,
  //      valueLength: 3 },
  //   path: '/name',
  //   value: 'foo',
  //   msg: 'User Name should contain 6 to 16 characters' }
})

```

use the msg as your i18n message key
```js  
const LOCALE = 'en'
const i18n = {
  locale: LOCALE,
  messages: {
    en: {
      user_name_required: 'Please input the User Name',
      user_name_length: 'User Name should contain 6 to 16 characters, current ${valueLength}'
    },
    //....
  },
  parseMsg(error) {
    if (error && error.path) {
      const msgParams = error.msgParams
      const msg = this.messages[this.locale][error.msg]
      if (msg) {
        error.msg = msg.replace(/\$\{(.+?)\}/g, (match, key) => {
          return msgParams[key];
        });
      }
    }
  }
}

const schema = _.map({
  name: _ .required.$msg('user_name_required')
          .string
          .length([6,16]).$msg('user_name_length')
})
schema.validate({name: 'foo'}, err => {
  i18n.parseMsg(err)
  console.log(err)
  // ValidationError {
  //   keyword: 'length',
  //   msgParams:
  //   { KEY: 'length_string_range',
  //     length: undefined,
  //     maxLength: 16,
  //     minLength: 6,
  //     valueLength: 3 },
  //   path: '/name',
  //   value: 'foo',
  //   msg: 'User Name should contain 6 to 16 characters, current 3' }
})

```

## Static Methods    
#### `addMsgs(msgs: Msgs): void`    
Add your own messages or overide default messages

```js  
const schema = _.required
schema.validate(null, err => {
  console.log(err)
  // ValidationError {
  //   keyword: 'required',
  //   msgParams: { KEY: 'required' },
  //   path: '/',
  //   value: null,
  //   msg: 'should not be null or undefined' }
})

const msgs = {
  required: 'This field is required'
}
_.addMsgs(msgs)

schema.validate(null, err => {
  console.log(err)
  // ValidationError {
  //   keyword: 'required',
  //   msgParams: { KEY: 'required' },
  //   path: '/',
  //   value: null,
  //   msg: 'This field is required' }
})
```

#### `addKeyword(keyword: Keyword, msgs?: Msgs): void`  
Add custom keyword  

Example  
```js  
const nameUnique = {
  name: 'nameUnique',
  validator(value, {path, rootData, state}, cb) {
    // your logic, make request or anything
    if (value === 'foo') {
      // error
      return cb(true)
    }
    cb()
  }
}
const msgs = {
  nameUnique: 'This name has been used'
}

_.addKeyword(nameUnique, msgs)

const schema = _.required.map({
  name: _.required.string.nameUnique
})

schema.validate({
  name: 'bar'
}, err => {
  console.log(err)
  // null
})

schema.validate({
  name: 'foo'
}, err => {
  console.log(err)
  // ValidationError {
  //   keyword: 'nameUnique',
  //   msgParams: { KEY: 'nameUnique' },
  //   path: '/name',
  //   value: 'foo',
  //   msg: 'This name has been used' }
  // })
})

```

Interfaces  
```ts
interface Keyword {
  name: string,
  // if this keyword need params?
  isHighOrder?: boolean,
  // if the validation of this keyword is asynchronous
  isAsync?: boolean;
  // `add` will be called when this keyword is added to a schema
  // we have default `add` method 
  // so you don't need to define `add` method in most cases
  add?: (...args: any[]) => any
  msg?: string | {[msgKey:string]: string},
  validator: (value: any, ctx: ValidationCtx | ValidationCtxHighOrder, cb: (err?: any) => any) => void,
  getChildSchema?: (options: {args: any, childKey: string}, cb: (schema?: GateSchemaBase) => any) => any
  getMatchSchema?: (options: {id: string, args: any, rootData: any, state: any }, cb: (schema?: GateSchemaBase) => any) => any
}
```

see `src/keywords` for more examples

#### `addAlias(alias: KeywordAlias): void`  
Add alias for keyword or schema


Example  
```js  
const r = {
  name: 'r',
  add() {
    // must return this
    return this.required
  }
}
const str = {
  name: 'str',
  add() {
    return this.string.notEmpty
  }
}

_.addAlias(r)
_.addAlias(str)

const schema = _.r.str
schema.validate('', err => {
  console.log(err)
  // ValidationError {
  //   keyword: 'notEmpty',
  //   msgParams: { KEY: 'notEmpty' },
  //   path: '/',
  //   value: '',
  //   msg: 'should not be empty' }
})

```

Interfaces
```ts
interface KeywordAlias {
  name: Keyword['name'],
  add: () => (this | ((...args: any[]) => this))
}
```

#### `extend<T extends this>(options?: Options): T`  
Create your own GateSchema Class

Interfaces
```ts
type Options = {
    defaultOptions: ValidationOptions;
    // the init constraints of the schema constructed by this constructor
    initConstraints?: Constraint[],
    keywords?: Keyword[], 
    aliases?: KeywordAlias[],
    msgs?: Msgs
}
```

Example  
```js
const _r = _.extend({
  initConstraints: ['required']
})

const _o = _.extend({
  initconstraints: ['optional']
})

const schema = _r.map({ // the same as `_.required.map`
  name: _o.string // the same as `_.optional.string`
})
```

```js
const objectAlias = {
  name: 'object',
  add() {
    return (options) => {
      return this.map(options)
    }
  }
}

const S = _.extend({
  aliases: [objectAlias]
})

const schema = S.object({
  address: S.object({
    name: S.required.string.notEmpty
  })
})

schema.validate({address: {}}, err => {
  console.log(err)
  // ValidationError {
  //   keyword: 'required',
  //   msgParams: { KEY: 'required' },
  //   path: '/address/name',
  //   value: undefined,
  //   msg: 'should not be null or undefined' }
})

```

```js  
const haveOneOf = {
  name: 'haveOneOf',
  // this is for the high order keyword, 
  // and we will get arguemnts in the validator
  isHighOrder: true, 
  validator(value, {path, rootData, state, args}, cb) {
    const keys = args[0]
    for(let i = 0 , length = keys.length; i < length; i++) {
      if (value[keys[i]]) {
        return cb()
      }
    }
    // error
    cb({
      keys: JSON.stringify(keys)
    })
  }
}
const msgs = {
  haveOneOf: 'should have one of those keys ${keys}'
}

const S = _.extend({
  keywords: [haveOneOf],
  msgs: msgs
})

const schema = S.map({
  name: S.optional.string,
  email: S.optional.string,
  password: S.required.string
}).haveOneOf(['name', 'email'])

schema.validate({password: '123456'}, err => {
  console.log(err)
  // ValidationError {
  //   keyword: 'haveOneOf',
  //   msgParams: { keys: '["name","email"]', KEY: 'haveOneOf' },
  //   path: '/',
  //   value: { password: '123456' },
  //   msg: 'should have one of those keys ["name","email"]' }
})

schema.validate({name: 'foo', password: '123456'}, err => {
  console.log(err)
})
```

```js
// use your own messages
const msgs = {
  required: '必填项',
  notEmpty: '不能为空'
  // ...
}

const S = _.extend({
  msgs
})

S.required.notEmpty.validate('', err => {
  console.log(err)
  // ValidationError {
  //   keyword: 'notEmpty',
  //   msgParams: { KEY: 'notEmpty' },
  //   path: '/',
  //   value: '',
  //   msg: '不能为空' }
})

```