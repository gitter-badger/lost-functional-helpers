# lost-functional-helpers

[![Version](http://img.shields.io/badge/version-0.0.1-green.svg)]()
[![Build Status](https://travis-ci.org/meandmax/lost-functional-helpers.svg?branch=master)](https://travis-ci.org/meandmax/lost-functional-helpers)
[![devDependency Status](https://david-dm.org/meandmax/lost-functional-helpers/dev-status.svg)](https://david-dm.org/meandmax/lost-functional-helpers#info=devDependencies)
[![Dependency Status](https://david-dm.org/meandmax/lost-functional-helpers.svg)](https://david-dm.org/meandmax/lost-functional-helpers.svg)

Higher-order functions used on simple arrays or similiar collections which provide functions like (.map(), .filter(), .reduce()) to process data. Can also be used in functional reactive programming with data-structures like streams or properties.

```
npm install lost-functional-helpers --save
```

## .wrap()
 Returns a function that wraps input values such that [0 <= x < size].
 
 Useful for carousels etc, where one should be able to click right and end up in the beginning. Uses the correct modulo operation, not the javascript style.

#### with simple arrays:

```js
    var functionalHelpers = require('../functional-helpers.js');
    console.log([1,2,3,4,5].map(functionalHelpers.wrap(4))); // [1,2,3,0,1]
```

Can be used with frp libraries (e.g. [Bacon.js](https://github.com/baconjs/bacon.js), [RxJS](https://github.com/Reactive-Extensions/RxJS), [Kefir.js](https://github.com/pozadi/kefir)). Examples are written with Bacon.js 

#### in frp:

```js
    var functionalHelpers = require('../functional-helpers.js');
    var Bacon             = require('baconjs');

    var stream = Bacon.sequentially(1000, [1, 2, 3, 4, 5])
        .map(functionalHelpers.wrap(4));
    
    // every 1000ms stream emits a value which is mapped on .wrap()
    stream.log();

    // result -> sequence of values over time: 1,2,3,0,1
```

## .clamp()
Returns a function that limits input values to range [min <= x <= max].

Useful for carousels etc without wrapping around (compare `wrap`). Swapping min and max is allowed and will be corrected.

#### with simple arrays:

 ```js
    var functionalHelpers = require('../functional-helpers.js');
    console.log([1,2,3,4,5].map(functionalHelpers.clamp(4))); // [1,2,3,4,4]
 ```

#### in frp:

```js
    var functionalHelpers = require('../functional-helpers.js');
    var Bacon             = require('baconjs');

    var stream = Bacon.sequentially(1000, [1, 2, 3, 4, 5])
        .map(functionalHelpers.clamp(4));
    
    // every 1000ms stream emits a value which is mapped on .wrap()
    stream.log();

    // result -> sequence of values over time: 1,2,3,4,4
```

## .constant()
Returns a function that always returns the same value.

#### with simple arrays:

 ```js
    var functionalHelpers = require('../functional-helpers.js');
    console.log(['click'].map(functionalHelpers.constant(4))); // [4]
 ```

#### in frp:

 ```js
    var functionalHelpers = require('../functional-helpers.js');
    var Bacon             = require('baconjs');

    var clickStream = $('.el').asEventStream('click');
    
    clickStream.map(functionalHelpers.constant(1));
    
    /**
     * every time the element gets clicked the stream emits an event which is 
     * mapped on the function .constant(1). The event is always mapped on the 
     * constant 1.
     */
    stream.log();

    // result -> sequence of values over time: 1,1,1,1,1 ..... as often as clicked
 ```

#### Further reading on functional reactive programming:
- [Introduction to frp](https://gist.github.com/staltz/868e7e9bc2a7b8c1f754)
- [RxJS](http://reactive-extensions.github.io/RxJS/)
- [BaconJs](https://github.com/baconjs/bacon.js)
- [RxJs Github](https://github.com/Reactive-Extensions/RxJS)
