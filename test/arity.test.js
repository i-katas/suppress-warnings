const arity = require('../src/arity');

describe('arity', () => {
    it('should run callback', () => {
        let callback = jest.fn();

        arity(0, callback)();

        expect(callback).toHaveBeenCalledWith();
    });

    it('should collect return value from callback', () => {
        let callback = arity(0, () => 2);

        let returned = callback();

        expect(returned).toBe(2);
    });

    it('should pass arguments in order to callback', () => {
        let callback = jest.fn();

        arity(0, callback)(1, 2);

        expect(callback).toHaveBeenCalledWith(1, 2);
    });

    it('should with same number of arguments as callback', () => {
        expect(arity(0, () => 3)).toHaveLength(0);
        expect(arity(1, () => 3)).toHaveLength(1);
    });

    it('return factory if callback is not provided', () => {
        let factory = arity(5);

        let callback = factory(() => 3);

        expect(callback).toHaveLength(5);
        expect(callback()).toEqual(3);
    });

    it('factory should be cached', () => {
        expect(arity(3)).toBe(arity(3));
    });
});
