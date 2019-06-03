var mongoose = require('mongoose');
//library that provides assertion logic.
var chai = require('chai');
//extension for making http request to API.
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

var should = chai.should();
assert = chai.assert,
    expect = chai.expect;

var models = require('../models/model');
var verifyToken = require('../auth/verifyToken')
var server = require('../app');

describe('Employee', () => {
    it('should take 500ms', function (done) {
        this.timeout(800)
        setTimeout(done, 500)
   }) 
    //describe() is used for collection of test features.
    describe('Get Employee', () => {
        //it() statement contains each individual test case or test a single feature.
        it('it should list all the employee /api GET', (done) => {
            //chai-http allows us to easily make a requests to an http endpoint.
            chai.request(server)
                .get('/api')
                .set('Authorization', `Bearer ${verifyToken}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('array');
                    done();
                })
        })
    })
    // test case for Post method.
    // describe('Post Employee', () => {
    //     it('should post the employee /api post', (done) => {
    //         let newEmployee = {
    //             employeeId: '22',
    //             employeeName: 'ammuuu',
    //             employeeMobileNo: '2467901098',
    //             employeeEmailId: 'anu765344@gmail.com',
    //             projectManagerId: '115',
    //             comments: "Work completed",
    //             password : "password"
    //         }
    //         chai.request(server)
    //             .post('/api')
    //             .send(newEmployee)
    //             .end((err, res) => {
    //                 res.should.have.status(200);
    //                 res.should.be.json;
    //                 res.body.should.be.a('object');
    //                 res.body.should.have.property('employeeId');
    //                 res.body.should.have.property('employeeName');
    //                 res.body.should.have.property('employeeMobileNo');
    //                 done();
    //             })
    //     })
    //     it('should not post the employee /api post', (done) => {
    //         let newEmployee = {
    //             employeeId: '3',
    //             employeeName: 'Ajith',
    //             employeeMobileNo: '8990065432',
    //             employeeEmailId: 'Ajithkumar@gmail.com',
    //             projectManagerId: '35',
    //             comments: "Work is pending",
    //             password: "pass"
    //         }
    //         chai.request(server)
    //             .post('/api')
    //             .send("This id is already in use.")
    //             .end((err, res) => {
    //                 res.should.have.status(404);
    //                 done();
    //             })
    //     })

    // })
    // // test case for GetById method.
    // describe('GetByIdEmployee', () => {
    //     describe('get by employeeId', () => {
    //         it('should list the employee /api/id get', (done) => {
    //             chai.request(server)
    //                 .get('/api/employee/?employeeId=1')
    //                 .end((err, res) => {
    //                     res.should.have.status(200);
    //                     res.should.be.json;
    //                     done();
    //                 })
    //         })
    //         //test case for failure response of GetById method.
    //         it('should not list the employee /api/id get', (done) => {
    //             chai.request(server)
    //                 .get('/api/employee/?employeeId=90')
    //                 .send("The given id is not found.")
    //                 .end((err, res) => {
    //                     res.should.have.status(404);
    //                     done();
    //                 })
    //         })
    //     })
    //     describe('get by employeeName', () => {
    //         it('should list the employee /api/id get', (done) => {
    //             chai.request(server)
    //                 .get('/api/employee/?employeeName=Chinu')
    //                 .end((err, res) => {
    //                     res.should.have.status(200);
    //                     res.should.be.json;
    //                     done();
    //                 })
    //         })
    //         it('should not list the employee /api/name', (done) => {
    //             chai.request(server)
    //                 .get('/api/employee/?employeeName=magic')
    //                 .send("The given name is not found.")
    //                 .end((err, res) => {
    //                     res.should.have.status(404);
    //                     done();
    //                 })
    //         })
    //     })
    //     describe('get by employeeProjectId', () => {
    //         it('should list the employee /api/projectManagerId get', (done) => {
    //             chai.request(server)
    //                 .get('/api/employee/?projectManagerId=103')
    //                 .end((err, res) => {
    //                     res.should.have.status(200);
    //                     res.should.be.json;
    //                     done();
    //                 })
    //         })
    //         it('should not list the employee /api/name', (done) => {
    //             chai.request(server)
    //                 .get('/api/employee/?projectManagerId=999')
    //                 .send("The given project manager id is not found.")
    //                 .end((err, res) => {
    //                     res.should.have.status(404);
    //                     done();
    //                 })
    //         })
    //     })
    // })
    // // test case for Put method.
    // describe('Put Employee', () => {
    //     describe('Put EmployeeId', () => {
    //         it('should put by id', (done) => {
    //             chai.request(server)
    //                 .get('/api')
    //                 .end((err, res) => {
    //                     chai.request(server)
    //                         .put('/api/employee/?employeeId=4')
    //                         .send({
    //                             employeeName: 'Chinu',
    //                             employeeMobileNo: '123456789',
    //                             employeeEmailId: 'ayuarul@yahoo.com',
    //                             projectManagerId: '111',
    //                             comments: "Work is in progress",
    //                             password : "pass"
    //                         })
    //                         .end((err, res) => {
    //                             res.should.have.status(200);
    //                             res.body.should.be.a('object');
    //                             done();
    //                         })
    //                 })
    //         })
    //         //test case for failure response of Put method.
    //         it('should not put by id', (done) => {
    //             chai.request(server)
    //                 .get('/api')
    //                 .end((err, res) => {
    //                     chai.request(server)
    //                         .put('/api/employee/?employeeId=44')
    //                         .send("There was a problem updating the employee.")
    //                         .end((err, res) => {
    //                             res.should.have.status(404);
    //                             done();
    //                         })
    //                 })
    //         })
    //     })
    //     describe('Put EmployeeName', () => {
    //         it('should put by name', (done) => {
    //             chai.request(server)
    //                 .get('/api')
    //                 .end((err, res) => {
    //                     chai.request(server)
    //                         .put('/api/employee/?employeeName=Ajith')
    //                         .send({
    //                             employeeId: 6,
    //                             employeeMobileNo: '123456789',
    //                             employeeEmailId: 'Vinothra@yahoo.com',
    //                             projectManagerId: '105',
    //                             comments: "Work is in progress",
    //                             password: "pass"
    //                         })
    //                         .end((err, res) => {
    //                             res.should.have.status(200);
    //                             res.body.should.be.a('object');
    //                             done();
    //                         })
    //                 })
    //         })
    //         //test case for failure response of Put method.
    //         it('should not put by name', (done) => {
    //             chai.request(server)
    //                 .get('/api')
    //                 .end((err, res) => {
    //                     chai.request(server)
    //                         .put('/api/employee/?employeeName=mnjig')
    //                         .send("There was a problem updating the employee.")
    //                         .end((err, res) => {
    //                             res.should.have.status(404);
    //                             done();
    //                         })
    //                 })
    //         })
    //     })
    //     describe('Put by projectManagerId', () => {
    //         it('should put by project manager id', (done) => {
    //             chai.request(server)
    //                 .get('/api')
    //                 .end((err, res) => {
    //                     chai.request(server)
    //                         .put('/api/employee/?projectManagerId=106')
    //                         .send({
    //                             employeeId: 20,
    //                             employeeName: 'Jeya',
    //                             employeeMobileNo: '123456789',
    //                             employeeEmailId: 'Jaichaitanyatha@yahoo.com',
    //                             comments: "Work completed",
    //                             password:"pass"
    //                         })
    //                         .end((err, res) => {
    //                             res.should.have.status(200);
    //                             res.body.should.be.a('object');
    //                             done();
    //                         })
    //                 })
    //         })
    //         it('should not put by project manager id', (done) => {
    //             chai.request(server)
    //                 .get('/api')
    //                 .end((err, res) => {
    //                     chai.request(server)
    //                         .put('/api/employee/?projectManagerId=130')
    //                         .send("There was a problem updating the employee.")
    //                         .end((err, res) => {
    //                             res.should.have.status(404);
    //                             done();
    //                         })
    //                 })
    //         })
    //     })
    // })
    // // test case for Delete method.
    // describe('Delete Employee', () => {
    //     describe('Delete EmployeeId', () => {
    //         it('should delete by id ', (done) => {
    //             chai.request(server)
    //                 .get('/api')
    //                 .end((err, res) => {
    //                     chai.request(server)
    //                         .delete('/api/employee/?employeeId=7')
    //                         .end((err, res) => {
    //                             res.should.have.status(200);
    //                             done();
    //                         });
    //                 });
    //         })
    //         // test case for failure response of Delete method.
    //         it('should not delete by id', (done) => {
    //             chai.request(server)
    //                 .get('/api')
    //                 .end((err, res) => {
    //                     chai.request(server)
    //                         .delete('/api/employee/?employeeId=43')
    //                         .send("The given id is not found for delete request.")
    //                         .end((err, res) => {
    //                             res.should.have.status(404);
    //                             done();
    //                         })
    //                 })
    //         })
    //     })
    //     describe('Delete Employee by name', () => {
    //         it('should delete by name ', (done) => {
    //             chai.request(server)
    //                 .get('/api')
    //                 .end((err, res) => {
    //                     chai.request(server)
    //                         .delete('/api/employee/?employeeName=Nivi')
    //                         .end((err, res) => {
    //                             res.should.have.status(200);
    //                             done();
    //                         });
    //                 });
    //         })
    //         // test case for failure response of Delete method.
    //         it('should not delete by name', (done) => {
    //             chai.request(server)
    //                 .get('/api')
    //                 .end((err, res) => {
    //                     chai.request(server)
    //                         .delete('/api/employee/?employeeName=xbyt')
    //                         .send("The given name is not found for delete request.")
    //                         .end((err, res) => {
    //                             res.should.have.status(404);
    //                             done();
    //                         })
    //                 })
    //         })
    //     })
    //     describe('Delete Employee by project manager id', () => {

    //         it('should delete by project manager id ', (done) => {
    //             chai.request(server)
    //                 .get('/api')
    //                 .end((err, res) => {
    //                     chai.request(server)
    //                         .delete('/api/employee/?projectManagerId=120')
    //                         .end((err, res) => {
    //                             res.should.have.status(200);
    //                             done();
    //                         });
    //                 });
    //         })
    //         // test case for failure response of Delete method.
    //         it('should not delete by project manager id', (done) => {
    //             chai.request(server)
    //                 .get('/api')
    //                 .end((err, res) => {
    //                     chai.request(server)
    //                         .delete('/api/employee/?projectManagerId=180')
    //                         .send("The given id is not found for delete request.")
    //                         .end((err, res) => {
    //                             res.should.have.status(404);
    //                             done();
    //                         })
    //                 })
    //         })

    //     })
    // })
})