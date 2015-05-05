(function () {

  'use strict';

  describe('thenResolve', function () {
    var $q, $timeout, $root;

    beforeEach(function () {
      module('angular.q.thenresolve');

      inject(function ($injector) {
        $q       = $injector.get('$q');
        $timeout = $injector.get('$timeout');
        $root    = $injector.get('$rootScope');
      });
    });

    it('is defined', function () {
      expect($q.defer().promise).to.have.property('thenResolve').that.is.a('function');
    });

    it('resolving a non-thenable returns a new promise', function () {
      var wait = false;
      var def  = $q.defer();

      def.promise
        .then(function () {
          wait = true;
        })
        .thenResolve('foo')
        .then(function (val) {
          expect(wait).to.be.true;
          expect(val).to.eq('foo');
        });

      def.resolve();
      flush();
    });

    it('resolving a promise returns the result of that promise', function () {
      var wait  = false;
      var def   = $q.defer();
      var inner = $q.defer();

      def.promise
        .then(function () {
          wait = true;
        })
        .thenResolve(inner.promise.thenResolve('innerFoo'))
        .then(function (val) {
          expect(wait).to.be.true;
          expect(val).to.eq('innerFoo');
        });

      def.resolve();
      inner.resolve();
      flush();
    });

    it('accepts a callback', function () {
      var def = $q.defer();

      def.promise.thenResolve('foo', function (res) {
        expect(res).to.eq('foo');
      });

      def.resolve();
      flush();
    });

    it('does nothing to rejections', function () {
      var def = $q.defer();

      def.promise
        .thenResolve('foo')
        .catch(function (err) {
          expect(err).to.eq('boo');
        });

      def.reject('boo');
      flush();
    });

    function flush (time) {
      return $timeout.flush(time);
    }
  });

}());
