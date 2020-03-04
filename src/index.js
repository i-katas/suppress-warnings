const arity = require('./arity');
const noop = () => void(0);

module.exports = function (callback) {
    const err = console.error;
    return arity(callback.length, function() {
        console.error = noop;
        try {
            return callback.apply(this, arguments);
        } finally {
            console.error = err;
        }
    });
};
