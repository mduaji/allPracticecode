//imports the chai  
const chai = require("chai");
//imports the chai-http 
const chaihttp = require('chai-http');
//imports th chai assertion should 
const should = chai.should();
//imports the index.js 
const server = require('../router/index');
//chai use chaihttp middleware
chai.use(chaihttp);

describe('Users', () => {

    // it('should take less than 500ms', function (done) {
    //     this.timeout(500);
    //     setTimeout(done, 300);
    // });

    //GET route to retrieve all the details.
    describe('get the details', () => {
        it('/get', function (done) {
            chai.request(server)
                .get('/api/v1')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });
    //GET route to retrieve all the particular ID details.
    describe('get the ID details', () => {
        describe('the given projrct id is vaild or not', () => {
            it('/the id not found', function (done) {
                chai.request(server)
                    .get('/api/v1/query?projectId=344')
                    .send('the given id is not found')
                    .end((err, res) => {
                        res.should.have.status(404);
                        done();
                    });
            });
            it('/get the vaild id', function (done) {
                chai.request(server)
                    .get('/api/v1/query?projectId=3')
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        done();
                    });
            });
        });
        describe('The Given Project Manager name is vaild or not', () => {
            it('/the given Manager name is not found', function (done) {
                chai.request(server)
                    .get('/api/v1/query?prjManager=akilasmsad')
                    .send('the given id is not found')
                    .end((err, res) => {
                        res.should.have.status(404);
                        done();
                    });
            });
            it('/get the given projectname', function (done) {
                chai.request(server)
                    .get('/api/v1/query?prjManager=anu')
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        done();
                    });
            });
        });
        describe('The Given ProjectName is vaild or Not', () => {
            it('/the given project name is not found', function (done) {
                chai.request(server)
                    .get('/api/v1/query?projectName=vv')
                    .send('the given id is not found')
                    .end((err, res) => {
                        res.should.have.status(404);
                        done();
                    });
            });
            it('/get the given projectname', function (done) {
                chai.request(server)
                    .get('/api/v1/query?projectName=collection')
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        done();
                    });
            });
        });       
    });
    //POST route to insert all the details.
    describe('should be Post the details', () => {

        it('/should not post without all column ', function (done) {
            let data = {
                projectId: 11,
                projectName: "collection",
                startDate: "2019-04-01",
                projectDuration: 60,
                totalPrjHours: 500,
                prjManager: "anu",
                prjDesc: "collection data"
            }
            chai.request(server)
                .post('/api/v1')
                .send('enter vaild id & this Id is already use')
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
        it('/should be insert the all column ', function (done) {
            let data = {
                projectId: 15,
                projectName: "collection",
                startDate: "2019-04-01",
                endDate: "2019-12-01",
                projectDuration: 60,
                totalPrjHours: 500,
                prjManager: "anu",
                prjDesc: "collection data"
            }
            chai.request(server)
                .post('/api/v1')
                .send(data)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.json;
                    done();
                });
        });
    });

    //PUT route to Update the details.
    describe(' Put the details', () => {
        describe('should be update all column based on project id or not',()=>{
            it('/should not update without all column ', function (done) {
                let data = {
                    projectName: "salary",
                    startDate: "2019-04-01",
                    endDate: "2019-12-01",
                    totalPrjHours: 500,
                    prjManager: "aaji",
                    prjDesc: "collection data"
                }
                chai.request(server)
                    .put('/api/v1/query?projectId=234')
                    .send('Id not found & Enter the Vaild Id to update....& should not update without all column')
                    .end((err, res) => {
                        res.should.have.status(404);
                        res.body.should.be.a('object');
                        done();
                    });
            });
            it('/should be update the particular id ', function (done) {
                let data = {
                    projectName: "salary",
                    startDate: "2019-04-01",
                    endDate: "2019-12-01",
                    projectDuration: 60,
                    totalPrjHours: 500,
                    prjManager: "aaji",
                    prjDesc: "collection data"
                }
                chai.request(server)
                    .put('/api/v1/query?projectId=3')
                    .send(data)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        done();
                    });
            });
    
        });
        describe('should be update all column based on project Manager Name or not',()=>{
            it('/should not update without all column ', function (done) {
                let data = {
                    projectName: "salary",
                    startDate: "2019-04-01",
                    endDate: "2019-12-01",
                    totalPrjHours: 500,
                    prjManager: "aaji",
                    prjDesc: "collection data"
                }
                chai.request(server)
                    .put('/api/v1/query?prjManager=abisehek')
                    .send('Id not found & Enter the Vaild Id to update....& should not update without all column')
                    .end((err, res) => {
                        res.should.have.status(404);
                        res.body.should.be.a('object');
                        done();
                    });
            });
            it('/should be update the particular id ', function (done) {
                let data = {
                    projectId:14,
                    projectName: "salary",
                    startDate: "2019-04-01",
                    endDate: "2019-12-01",
                    projectDuration: 60,
                    totalPrjHours: 500,
                    prjDesc: "collection data"
                }
                chai.request(server)
                    .put('/api/v1/query?prjManager=abi')
                    .send(data)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        done();
                    });
            });
    
        })
        describe('should be update all column based on projectName or not',()=>{
            it('/should not update without all column ', function (done) {
                let data = {
                    projectId:6,
                    startDate: "2019-04-01",
                    endDate: "2019-12-01",
                    totalPrjHours: 500,
                    prjManager: "aaji",
                    prjDesc: "collection data"
                }
                chai.request(server)
                    .put('/api/v1/query?projectName=salary')
                    .send('Id not found & Enter the Vaild Id to update....& should not update without all column')
                    .end((err, res) => {
                        res.should.have.status(404);
                        done();
                    });
            });
            it('/should be update the particular id ', function (done) {
                let data = {
                    projectId:15,
                    startDate: "2019-04-01",
                    endDate: "2019-12-01",
                    projectDuration: 60,
                    totalPrjHours: 500,
                    prjManager: "aaji",
                    prjDesc: "collection data"
                }
                chai.request(server)
                    .put('/api/v1/query?projectName=collection')
                    .send(data)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        done();
                    });
            });
    
        })
        
    });
   // Delete route to delete the ID details
    describe('/delete the user', () => {
        describe('/should be delete the details by project id or not',()=>{
            it('/the delete id is not found', function (done) {
                chai.request(server)
                    .delete('/api/v1/query?projectId=50')
                    .send('delete the details will error & Enter the Valid Id')
                    .end((err, res) => {
                        res.should.have.status(404);
                        res.body.should.be.a('object');
                        done();
                    });
            });
            it('/should be delete the particular id', function (done) {
                chai.request(server)
                    .delete('/api/v1/query?projectId=7')
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        done();
                    });
            });
        })
        describe('/delete the details by project name or not',()=>{
            it('/the delete id is not found', function (done) {
                chai.request(server)
                    .delete('/api/v1/query?projectName=ajex')
                    .send('delete the details will error & Enter the Valid Id')
                    .end((err, res) => {
                        res.should.have.status(404);
                        res.body.should.be.a('object');
                        done();
                    });
            });
            it('/should be delete the particular id', function (done) {
                chai.request(server)
                    .delete('/api/v1/query?projectName=salr')
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        done();
                    });
            });
        })
        describe('/delete the details by Manager name or not',()=>{
            it('/the delete id is not found', function (done) {
                chai.request(server)
                    .delete('/api/v1/query?prjManager=ajex')
                    .send('delete the details will error & Enter the Valid Id')
                    .end((err, res) => {
                        res.should.have.status(404);
                        res.body.should.be.a('object');
                        done();
                    });
            });
            it('/should be delete the particular id', function (done) {
                chai.request(server)
                    .delete('/api/v1/query?prjManager=aji')
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        done();
                    });
            });
        })

    });

});



