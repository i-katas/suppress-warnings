const suppressWarnings = require('..');

describe('suppressWarnings', () => {
    it('should direct error around callback only', () => {
        let err = console.error = jest.fn();
        let suppressedCallback = suppressWarnings(() => console.error());
        expect(console.error).toBe(err);

        suppressedCallback();

        expect(err).not.toHaveBeenCalled();
        expect(console.error).toBe(err);
    });
});
