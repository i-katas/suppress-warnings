const suppressWarnings = require('..');

describe('suppressWarnings', () => {
    it('should run callback', () => {
        let callback = jest.fn();

        suppressWarnings(callback)();

        expect(callback).toHaveBeenCalledWith();
    });

    it('should collect return value from callback', () => {
        let callback = suppressWarnings(() => 2);

        let returned = callback();

        expect(returned).toBe(2);
    });

    it('should pass arguments in order to callback', () => {
        let callback = jest.fn();

        suppressWarnings(callback)(1, 2);

        expect(callback).toHaveBeenCalledWith(1, 2);
    });

    it('should direct error around callback only', () => {
        let err = console.error = jest.fn();
        let suppressedCallback = suppressWarnings(() => console.error());
        expect(console.error).toBe(err);

        suppressedCallback();

        expect(err).not.toHaveBeenCalled();
        expect(console.error).toBe(err);
    });

    it('should with same number of arguments as callback', () => {
        expect(suppressWarnings(() => 0)).toHaveLength(0);
        expect(suppressWarnings(a => a)).toHaveLength(1);
    });
});
