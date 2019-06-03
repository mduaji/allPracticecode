var mongoose = require('mongoose');
var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

var should = chai.should();
assert = chai.assert,
    expect = chai.expect;
var models = require('../models/model');
var server = require('../app');
var config = require('../config');

describe('Employee', () => {
    it('should take 500ms', function (done) {
        this.timeout(800)
        setTimeout(done, 500)
    });

    describe('Post Employee', () => {
        it('should register the employee /api post', (done) => {
            let newEmployee = {
                employeeId: '29',
                employeeName: 'ammuuu',
                employeeMobileNo: '2467901098',
                employeeEmailId: 'ammuuu@gmail.com',
                projectManagerId: '115',
                comments: "Work completed",
                password: "pass"
            }
            chai.request(server)
                .post('/api/auth/register')
                .send(newEmployee)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.json;
                    done();
                })
        })
    })
})