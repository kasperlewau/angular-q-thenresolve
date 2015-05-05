(function() {
    "use strict";
    function config($provide) {
        $qDecorator.$inject = [ "$delegate" ];
        function $qDecorator($delegate) {
            var originalDefer = $delegate.defer;
            $delegate.defer = function() {
                var deferred = originalDefer();
                var proto = deferred.promise.constructor.prototype;
                Object.defineProperty(proto, "thenResolve", {
                    value: function(val, cb) {
                        return this.then(function() {
                            return cb && typeof cb === "function" ? cb(val) : val;
                        });
                    },
                    writable: true,
                    enumerable: false
                });
                return deferred;
            };
            return $delegate;
        }
        $provide.decorator("$q", $qDecorator);
    }
    angular.module("angular.q.thenresolve", []).config(config);
})();