const assert = require('assert');

describe('basic mocha testing', () => {
    it('calulate the length of string', () => {
        assert.equal('Hello'.length, 5);
    });
    it('should return the first char of string', () => {
        assert.equal('Hello'.charAt(0), 'H');
    });
});