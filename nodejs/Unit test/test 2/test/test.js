const assert = require('assert');
const std_Controller = require('../controller/controller.js');

describe('the student controller fn', () => {
    describe('isValidUserId', () => {
        it('should return isValidUserId true', () => {
            const isVaild = std_Controller.isValidUserId(['ajith', 'ajay'], 'ajith')
            assert.equal(isVaild, true);
        });
        it('should return the UserID false', () => {
            const isVaild = std_Controller.isValidUserId(['ajith', 'ajay'], 'aji')
            assert.equal(isVaild, false);
        });
    });
});