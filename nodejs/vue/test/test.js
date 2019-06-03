//imports the chai  
const chai = require("chai");
//imports the chai-http 
const chaihttp = require('chai-http');
//imports th chai assertion should 
const should = chai.should();
//imports the index.js 
const server = require('../app');
//chai use chaihttp middleware
chai.use(chaihttp);

describe('Users', () => {

    it('should take less than 500ms', function (done) {
        this.timeout(500);
        setTimeout(done, 300);
    });
    var token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9qZWN0SWQiOjE1LCJfaWQiOiI1Y2MzMDgzYjZjMWRlMzE1ZjRhZDdiYWMiLCJpYXQiOjE1NTYyODU1MTAsImV4cCI6MTU1NjI5MjcxMH0.go9yKQ0J9jZleIW-d4WLVcaNKDu5K-tyhEfd324n6dw"
   
    describe('Should be get the details', () => {
        it('should take less than 500ms', function (done) {
            this.timeout(500);
            setTimeout(done, 300);
        });
        it('/get', function (done) {
            chai.request(server)
                .get('/api/v1/get')
                .set('Authorization', 'uhguygi')
                .end((err, res) => {
                    res.should.have.status(404);
                   // res.body.should.be.a('object');
                    done();
                });
        });
    });
    //GET route to retrieve all the details.
    describe('Should be get the details', () => {
        it('/get', function (done) {
            chai.request(server)
                .get('/api/v1/get')
                .set('Authorization', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });
    //GET route to retrieve all the particular ID details.
    describe('should be get the ParticularID details', () => {
        describe('Get the given ProjectId', () => {
            it('The id is not found', function (done) {
                chai.request(server)
                    .get('/api/v1/query?projectId=344')
                    .set('Authorization', token)
                    .send('the given id is not found')
                    .end((err, res) => {
                        res.should.have.status(404);
                        done();
                    });
            });
            it('/get the vaild id', function (done) {
                chai.request(server)
                    .get('/api/v1/query?projectId=1')
                    .set('Authorization', token)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        done();
                    });
            });
        });
        describe('Get the given Project Manager', () => {
            it('the given Manager name is not found', function (done) {
                chai.request(server)
                    .get('/api/v1/query?projectManager=aksha')
                    .set('Authorization', token)
                    .send('the given id is not found')
                    .end((err, res) => {
                        res.should.have.status(404);
                        done();
                    });
            });
            it('get the given project Manager', function (done) {
                chai.request(server)
                    .get('/api/v1/query?projectManager=akshaya')
                    .set('Authorization', token)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        done();
                    });
            });
        });
        describe('Get the Given Project Name', () => {
            it('the given project name is not found', function (done) {
                chai.request(server)
                    .get('/api/v1/query?projectName=vv')
                    .set('Authorization', token)
                    .send('the given id is not found')
                    .end((err, res) => {
                        res.should.have.status(404);
                        done();
                    });
            });
            it('get the given projectname', function (done) {
                chai.request(server)
                    .get('/api/v1/query?projectName=ajexcall')
                    .set('Authorization', token)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        done();
                    });
            });
        });
    });
    //POST route to insert all the details.
    describe('should be Post the details', () => {
        it('the joi validation should error ', function (done) {
            let data = {
                projectId: 11,
                projectName: "collection",
                startDate: "2019-04-01",
                projectDuration: 60,
                totalProjectHours: 500,
                projectManager: "anu",
                projectDesc: "collection data",
                password: "ajith123"
            }
            chai.request(server)
                .post('/api/v1/post')
                .set('Authorization', token)
                .send(data)
                .end((err, res) => {
                    res.should.have.status(405);
                    done();
                });
        });
        it('should be post exist column', function (done) {
            let data = {
                projectId: 3,
                projectName: "collection",
                startDate: "2019-04-01",
                endDate: "2019-07-01",
                projectDuration: 60,
                totalProjectHours: 500,
                projectManager: 'ajay',
                projectDesc: "collection data",
                password: "ajith123"
            }
            chai.request(server)
                .post('/api/v1/post')
                .set('Authorization', token)
                .send(data)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                })
        })
        it('should be insert Data with  all column ', function (done) {
            let data = {
                projectId: 24,
                projectName: "collectiondatas",
                startDate: "2019-04-01",
                endDate: "2019-12-01",
                projectDuration: 60,
                totalProjectHours: 500,
                projectManager: "anusiya1",
                projectDesc: "collection data",
                password: "ajith123"
            }
            chai.request(server)
                .post('/api/v1/post')
                .set('Authorization', token)
                .send(data)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });
    //PUT route to Update the details.
    describe('should be Update the details', () => {
        describe('should be update the given project id ', () => {
            it('the joi validation should error', function (done) {
                let data = {
                    projectName: "collection",
                    startDate: "2019-04-01",
                    endDate: "2019-07-01",
                    projectDuration: 60,
                    totalProjectHours: 500,
                    projectDesc: "collection data",
                    password: "ajith123"
                }
                chai.request(server)
                    .put('/api/v1/query?projectId=3')
                    .set('Authorization', token)
                    .send(data)
                    .end((req, res) => {
                        res.should.have.status(405);
                        done();
                    })
            })
            it('the project id is not found', function (done) {
                let data = {
                    projectName: "salary",
                    startDate: "2019-04-01",
                    endDate: "2019-12-01",
                    projectDuration: 60,
                    totalProjectHours: 500,
                    projectManager: "aaji",
                    projectDesc: "collection data",
                    password: "aji122"
                }
                chai.request(server)
                    .put('/api/v1/query?projectId=335')
                    .set('Authorization', token)
                    .send(data)
                    .end((err, res) => {
                        res.should.have.status(404);
                        done();
                    });
            })
            it('should be update the particular id ', function (done) {
                let data = {
                    projectName: "salary",
                    startDate: "2019-04-01",
                    endDate: "2019-12-01",
                    projectDuration: 60,
                    totalProjectHours: 500,
                    projectManager: "aaji",
                    projectDesc: "collection data",
                    password: "aji122"
                }
                chai.request(server)
                    .put('/api/v1/query?projectId=3')
                    .set('Authorization', token)
                    .send(data)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        done();
                    });
            });

        });
        describe('should be update the given project Manager Name ', () => {
            it('the joi validation should error', function (done) {
                let data = {
                    projectId: 1,
                    projectName: "collection",
                    startDate: "2019-04-01",
                    endDate: "2019-07-01",
                    totalProjectHours: 500,
                    projectDesc: "collection data",
                    password: "ajith123"
                }
                chai.request(server)
                    .put('/api/v1/query?projectManager=ajitha')
                    .set('Authorization', token)
                    .send(data)
                    .end((req, res) => {
                        res.should.have.status(405);
                        done();
                    })
            })
            it('the projectManager name is not found ', function (done) {
                let data = {
                    projectId: 2,
                    projectName: "collectiondatas",
                    startDate: "2019-04-01",
                    endDate: "2019-12-01",
                    projectDuration: 62,
                    totalProjectHours: 500,
                    projectDesc: "collectiondt",
                    password: "jeyam12"
                }
                chai.request(server)
                    .put('/api/v1/query?projectManager=anus')
                    .set('Authorization', token)
                    .send(data)
                    .end((err, res) => {
                        res.should.have.status(404);
                        res.body.should.be.a('object');
                        done();
                    });
            });
            it('should be update the projectManager ', function (done) {
                let data = {
                    projectId: 2,
                    projectName: "collectiondatas",
                    startDate: "2019-04-01",
                    endDate: "2019-12-01",
                    projectDuration: 62,
                    totalProjectHours: 500,
                    projectDesc: "collectiondt",
                    password: "jeyam12"
                }
                chai.request(server)
                    .put('/api/v1/query?projectManager=ajitha1')
                    .set('Authorization', token)
                    .send(data)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        done();
                    });
            });

        });
        describe('should be update the given projectName ', () => {
            it('the joi validation should error', function (done) {
                let data = {
                    projectId: 1,
                    startDate: "2019-04-01",
                    endDate: "2019-07-01",
                    projectDuration: 60,
                    totalProjectHours: 500,
                    projectDesc: "collection data",
                    password: "ajith123"
                }
                chai.request(server)
                    .put('/api/v1/query?projectName=collection')
                    .set('Authorization', token)
                    .send(data)
                    .end((req, res) => {
                        res.should.have.status(405);
                        done();
                    })
            })
            it('the projectName id not found', function (done) {
                let data = {
                    projectId: 6,
                    startDate: "2019-04-01",
                    endDate: "2019-12-01",
                    projectDuration: 60,
                    totalProjectHours: 509,
                    projectManager: "kumar",
                    projectDesc: "collection data",
                    password: "akiln12"
                }
                chai.request(server)
                    .put('/api/v1/query?projectName=coll')
                    .set('Authorization', token)
                    .send(data)
                    .end((err, res) => {
                        res.should.have.status(404);
                        res.body.should.be.a('object');
                        done();
                    });
            });
            it('/should be update the particular ProjetcName ', function (done) {
                let data = {
                    projectId: 6,
                    startDate: "2019-04-01",
                    endDate: "2019-12-01",
                    projectDuration: 60,
                    totalProjectHours: 509,
                    projectManager: "kumar",
                    projectDesc: "collection data",
                    password: "akiln12"
                }
                chai.request(server)
                    .put('/api/v1/query?projectName=ajexmethod')
                    .set('Authorization', token)
                    .send(data)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        done();
                    });
            });

        });

    });
    describe('should be register the details', () => {

        describe('should register the details', () => {
            it('the joi validation should error', function (done) {
                let data = {
                    projectId: 23,
                    projectName: "datamig",
                    startDate: "2019-04-01",
                    endDate: "2019-05-01",
                    projectDuration: 30,
                    totalProjectHours: 400000,
                    projectManager: "ajith",
                    // projectDesc: "datamig",
                    password: "ajith"
                }

                chai.request(server)
                    .post('/users/register')
                    .send(data)
                    .end((req, res) => {
                        res.should.have.status(404);
                        done();
                    })
            })
            it('register already exists column', function (done) {
                let data = {
                    projectId: 1,
                    projectName: "collection",
                    startDate: "2019-04-01",
                    endDate: "2019-07-01",
                    projectDuration: 60,
                    totalProjectHours: 500,
                    projectManager: "anu",
                    projectDesc: "collection data",
                    password: "ajith13"
                }
                chai.request(server)
                    .post('/users/register')
                    .send(data)
                    .end((req, res) => {
                        res.should.have.status(404);
                        done();
                    });
            });
            it('register the details using /post', function (done) {
                let data = {
                    projectId: 27,
                    projectName: "collection",
                    startDate: "2019-04-01",
                    endDate: "2019-07-01",
                    projectDuration: 60,
                    totalProjectHours: 400,
                    projectManager: "ajithkumar1",
                    projectDesc: "collection data",
                    password: "ajith25"
                }
                chai.request(server)
                    .post('/users/register')
                    .send(data)
                    .end((req, res) => {
                        res.should.have.status(200);
                        // res.boby.should.be('object');
                        done();
                    });
            });
        });
        describe('should authenticate the details', () => {
            it('Should not found the user information', function (done) {
                chai.request(server)
                    .post('/users/authenticate')
                    .send('InvalidId')
                    .end((req, res) => {
                        res.should.have.status(404);
                        done();
                    });
            });
            it('authenticate with wrong password or id', function (done) {
                let data = {
                    projectId: 3,
                    password: "asaa"
                }
                chai.request(server)
                    .post('/users/authenticate')
                    .send(data)
                    .end((req, res) => {
                        res.should.have.status(404);
                        done();
                    });
            });
            it('Authenticate the details using /post', function (done) {
                let auth = {
                    projectId: 1,
                    password: "ajith"
                }
                chai.request(server)
                    .post('/users/authenticate')
                    .set('content-type', 'application/json')
                    .send(auth)
                    .end((req, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object')
                        done();
                    });
            });

        });
    });
    //Delete route to delete the ID details
    describe('Should be delete the user', () => {
        describe('/should be delete the Given project id ', () => {
            it('the delete id is not found', function (done) {
                chai.request(server)
                    .delete('/api/v1/query?projectId=50')
                    .set('Authorization', token)
                    .send('delete the details will error & Enter the Valid Id')
                    .end((err, res) => {
                        res.should.have.status(404);
                        res.body.should.be.a('object');
                        done();
                    });
            });
            it('should be delete the particular id', function (done) {
                chai.request(server)
                    .delete('/api/v1/query?projectId=24')
                    .set('Authorization', token)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        done();
                    });
            });
        })
        describe('should be delete the Given Project Name', () => {
            it('should take less than 500ms', function (done) {
                this.timeout(500);
                setTimeout(done, 300);
            });
            it('the delete ProjectName is not found', function (done) {
                chai.request(server)
                    .delete('/api/v1/query?projectName=ajex')
                    .set('Authorization', token)
                    .send('delete the details will error & Enter the Valid Id')
                    .end((err, res) => {
                        res.should.have.status(404);
                        res.body.should.be.a('object');
                        done();
                    });
            });
            it('/should be delete the particular projectName', function (done) {
                chai.request(server)
                    .delete('/api/v1/query?projectName=salaryupdt')
                    .set('Authorization', token)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        done();
                    });
            });
        })
        describe('/should be delete the Given Project Manager Name', () => {
            it('/the delete Manager Name is not found', function (done) {
                chai.request(server)
                    .delete('/api/v1/query?projectManager=ajex')
                    .set('Authorization', token)
                    .send('delete the details will error & Enter the Valid Id')
                    .end((err, res) => {
                        res.should.have.status(404);
                        res.body.should.be.a('object');
                        done();
                    });
            });
            it('/should be delete the particular Manager Name', function (done) {
                chai.request(server)
                    .delete('/api/v1/query?projectManager=ajithkumar1')
                    .set('Authorization', token)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        done();
                    });
            });
        });

    });
   
});
