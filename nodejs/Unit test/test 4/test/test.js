const assert = require('assert');

const logincontroller = require('../controller/controller.js');

const expect = require('chai').expect;
const should = require('chai').should();

beforeEach('setup to userList ', () => {
    console.log('beforeEach');
    logincontroller.loadUser(['ajith', 'abi', 'ajay']);
})

describe('logInController', () => {

    describe('isvalidUserId', () => {
        it('should return user id true', () => {
            const isValid = logincontroller.isValidUserId('ajith');
           // assert.equal(isValid, true);
           expect(isValid).to.be.true;
        });
        it('should return user id false', () => {
            const isValid = logincontroller.isValidUserId('jy');
            //assert.equal(isValid, false);
            isValid.should.equal(false);
        });
    });
    describe('isValidUserIdAsync', () => {
        it('should return user id async', (done) => {
            logincontroller.isValidUserIdAsync('ajith',
                (isValid) => {
                   // assert.equal(isValid, true);
                   isValid.should.equal(true);
                    done();
                });
        });
    });

});