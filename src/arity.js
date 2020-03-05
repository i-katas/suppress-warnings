(function(define) {
  var cache = {};
  var rewriteLength = (function(rewrite){ 
    try {
      return rewrite && rewrite(arguments.callee, 'length', {value: 5}).length == 5 && rewrite; 
    } catch(e) {
      return false;
    }
  })(Object.defineProperty);

  function factory(n) {
    if(rewriteLength) {
      return function(f) {
        return rewriteLength(f, 'length', {value: n});
      };
    }
    return new Function("f", 'return function('+withArgs(n)+'){return f.apply(this, arguments)}');
  }

  function withArgs(n) {
      return Array(n).fill('_').join(',');
  }

  define('arity', function (n, callback) {
    var make = cache[n] || (cache[n] = factory(n));
    return arguments.length > 1 ? make(callback) : make;
  })

})(typeof module == 'object' && typeof module.exports == 'object' ?  function(_, fn) { module.exports = fn } : function(name, fn) { window[name] = fn})
