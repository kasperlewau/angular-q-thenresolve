## angular-q-thenresolve [![travisci](https://travis-ci.org/kasperlewau/angular-q-thenresolve.svg?branch=master)](https://travis-ci.org/kasperlewau/angular-q-thenresolve)
> Adds a `.thenResolve` sugar method to promises returned by $q.

### installation
```
  bower install angular-q-thenresolve --save
```

### usage
```js
  /** angular.module('yourModule', [ 'angular.q.thenresolve' ]); **/

  var value;

  $q.defer().promise
    .thenResolve('foo')
    .then(function (res) {
      value = res;
      // value === 'foo'
    });

  /** OR **/

  $q.defer().promise.thenResolve('foo', function (val) {
    // val === 'foo'
  });
```

### testing
`npm install; npm test`

### license
MIT © [Kasper Lewau](https://github.com/kasperlewau)
