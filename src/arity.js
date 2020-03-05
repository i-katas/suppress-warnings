(function(global, factory){
  if(typeof module == 'object' && typeof module.exports == 'object') {
    module.exports = factory();
  }
  else {
    factory(global);
  }
})(typeof window !== 'undefined' && window || this, function(window) {
  var cache = {};
  var rewriteLength = (function(define){ 
    try {
      return define && (function(define) {
        function setLength(fn, n) {
          return define(fn, 'length', {value: n});
        }
        return setLength(arguments.callee, 5).length === 5 && setLength;
      })(define); 
    } catch(e) {
      return false;
    }
  })(Object.defineProperty);

  function factory(n) {
    if(rewriteLength) {
      return function(f) {
        return rewriteLength(f, n);
      };
    }
    return new Function("f", 'return function('+withArgs(n)+'){return f.apply(this, arguments)}');
  }

  function withArgs(n) {
      return Array(n).fill('_').join(',');
  }

  function arity(n, callback) {
    var make = cache[n] || (cache[n] = factory(n));
    return arguments.length > 1 ? make(callback) : make;
  };

  if(window) {
    window.arity = arity;
  }

  return arity;
})
