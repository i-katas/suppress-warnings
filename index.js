const noop = () => void(0);

function reflectArgs(fn) {
    return Array(fn.length + 1).fill('_');
}

module.exports = function (callback) {
    const err = console.error;
    return new Function(reflectArgs(callback), 'return arguments[0].apply(this, Array.prototype.slice.call(arguments, 1))').bind(this, function suppressedCallback() {
        console.error = noop;
        try {
            return callback.apply(this, arguments);
        } finally {
            console.error = err;
        }
    });
};
