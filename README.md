A simple and expressive [GateSchema](https://github.com/GateSchema/GateSchema) implementation

## What is GateSchema  
GateSchema specifies a list of keywords and a JSON-based format to define constraints of the data required by a given function, service or application. See [GateSchema](https://github.com/GateSchema/GateSchema) for more details.  

With tools of GateSchema, you may be able to  
* create schema using simple syntax provided by [gateschema-js](https://github.com/GateSchema/gateschema-js)   
* share schema between client-side and server-side, crossing language    
* generate forms, see [gateschema-form-vue](https://github.com/GateSchema/gateschema-form-vue) and [gateschema-form-react](https://github.com/GateSchema/gateschema-form-react)  
* describe rpc service, see [Parton API](https://github.com/partonio/PartonAPI-Specification) 


## Quick Start  
```js  
import _ from 'gateschema'  
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

```

## Install  
```
npm install gateschema --save  
```

## API  
see [api](docs/api.md)  

## Q&A  
### Custom messages and i18n  
  see $msg and addMsgs

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
      case: _
        .value(true), // if `employed` is true
      schema: _ // then the input shoud be a map containing `employee` key
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

## License  
MIT