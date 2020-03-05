module.exports = function arity(n, callback) {
  var make = cache[n] || (cache[n] = factory(n));
  return arguments.length > 1 ? make(callback) : make;
}

var cache = {};
var supportsRewriteLength = (function(define){ 
  try {
    return define && define(arguments.callee, 'length', {value: 5}).length == 5; 
  } catch(e) {
    return false;
  }
})(Object.defineProperty);

function factory(n) {
  if(supportsRewriteLength) {
    return function(f) {
      return Object.defineProperty(f, 'length', {value: n});
    };
  }
  return new Function("f", 'return function('+withArgs(n)+'){return f.apply(this, arguments)}');
}

function withArgs(n) {
    return Array(n).fill('_').join(',');
}

