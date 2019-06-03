const assert = require('assert');

const logincontroller = require('../controller/controller.js');

describe('logInController',()=>{

    describe('isvalidUserId',()=>{
        it('should return user id true',()=>{
            const isValid = logincontroller.isValidUserId(['ajith','ajay'],'ajay');
            assert.equal(isValid,true);
        });
        it('should return user id false',()=>{
            const isValid = logincontroller.isValidUserId(['ajith','joy'],'jy');
            assert.equal(isValid,false);            
        });     
    });
    describe('isValidUserIdAsync',()=>{
        it('should return user id async',(done)=>{
            const isValid=logincontroller.isValidUserIdAsync(['ajith','abi'],'abi',
            (isValid)=>{
                assert.equal(isValid,true);
                done();
            });
        });
    });

});