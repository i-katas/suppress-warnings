module.exports = function arity(n, callback) {
  var make = factory(n);
  return arguments.length > 1 ? make(callback) : make;
}

var cache = {};

function factory(n) {
  return cache[n] || (cache[n] = new Function("f", 'return function('+withArgs(n)+'){return f.apply(this, arguments)}'));
}

function withArgs(n) {
    return Array(n).fill('_').join(',');
}

