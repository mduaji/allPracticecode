const chai = require('chai');
const chaihttp = require('chai-http');
const should = chai.should();
const server = require('../app');
chai.use(chaihttp);

describe('Details', () => {
    it('should take less than 500ms', function (done) {
        this.timeout(500);
        setTimeout(done, 300);
    });
    var token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NTU1MDEyMTEsImV4cCI6MTU1NTUwODQxMX0.eYTxOGRfD7a9of7-tGQoAtH9mMwVTLiV1yNVIUaDV9o"
    describe('get the details', () => {
        it('/get ', function (done) {
            chai.request(server)
                .get('/api/v1/get')
                .set('Authorization', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    //res.body.should.be('array');
                    done()
                });
        });
    });
    describe('get the Id details', () => {
        describe('get by the id', () => {
            it('/get the wrong id ', function (done) {
                chai.request(server)
                    .get('/api/v1/get/query?id=100')
                    .set('Authorization', token)
                    .end((err, res) => {
                        res.should.have.status(404);
                        done()
                    });
            });
            it('/get the correct id ', function (done) {
                chai.request(server)
                    .get('/api/v1/get/query?id=5')
                    .set('Authorization', token)
                    .end((err, res) => {
                        res.should.have.status(200);
                        done()
                    });
            });
        });

        describe('get by the id', () => {
            it('/get by wrong name', function (done) {
                chai.request(server)
                    .get('/api/v1/get/query?name=deva')
                    .set('Authorization', token)
                    .end((err, res) => {
                        res.should.have.status(404);
                        done()
                    });
            });
            it('/get by the name ', function (done) {
                chai.request(server)
                    .get('/api/v1/get/query?name=vana')
                    .set('Authorization', token)
                    .end((err, res) => {
                        res.should.have.status(200);
                        done()
                    });
            });
        });
    });
    describe('delete the Id details', () => {
        describe('delete by the id', () => {
            it('/delete the wrong id ', function (done) {
                chai.request(server)
                    .delete('/api/v1/delete/query?id=100')
                    .set('Authorization', token)
                    .end((err, res) => {
                        res.should.have.status(404);
                        done()
                    });
            });
            it('/delete the correct id ', function (done) {
                chai.request(server)
                    .delete('/api/v1/delete/query?id=1')
                    .set('Authorization', token)
                    .end((err, res) => {
                        res.should.have.status(200);
                        done()
                    });
            });
        });

        describe('delete by the id', () => {
            it('/delete by wrong name', function (done) {
                chai.request(server)
                    .delete('/api/v1/delete/query?name=deva')
                    .set('Authorization', token)
                    .end((err, res) => {
                        res.should.have.status(404);
                        done()
                    });
            });
            it('/delete by the name ', function (done) {
                chai.request(server)
                    .delete('/api/v1/delete/query?name=vana')
                    .set('Authorization', token)
                    .end((err, res) => {
                        res.should.have.status(200);
                        done()
                    });
            });
        });
    });
    describe('post by the details', () => {
        it('/post the exist id ', function (done) {
            var value = {
                id: 1,
                name: 'ajith1',
                age: 22,
                address: "maduari",
                password: 'hash'
            }
            chai.request(server)
                .post('/api/v1/post')
                .set('Authorization', token)
                .send(value)
                .end((err, res) => {
                    res.should.have.status(404);
                    done()
                });
        });
        it('/post the correct id ', function (done) {
            var value = {
                id: 2,
                name: "akil",
                age: 23,
                address: "thanjavur",
                password: "hash"
            }
            chai.request(server)
                .post('/api/v1/post')
                .set('Authorization', token)
                .send(value)
                .end((err, res) => {
                    res.should.have.status(200);
                    done()
                });
        });
    });
    describe('update the Id details', () => {
        describe('update by the id', () => {
            it('/update the wrong id ', function (done) {
                var value = {
                    id: 100,
                    name: "anu",
                    age: 22,
                    address: "covai",
                    password: "hash"
                }
                chai.request(server)
                    .put('/api/v1/put/query?id=100')
                    .set('Authorization', token)
                    .send(value)
                    .end((err, res) => {
                        res.should.have.status(404);
                        done()
                    });
            });
            it('/update the correct id ', function (done) {
                var value = {
                    id: 2,
                    name: "pavi",
                    age: 24,
                    address: 'covilur',
                    password: "hash"
                }
                chai.request(server)
                    .put('/api/v1/put/query?id=2')
                    .set('Authorization', token)
                    .send(value)
                    .end((err, res) => {
                        res.should.have.status(200);
                        done()
                    });
            });
        });

        describe('update by the name', () => {
            it('/update by wrong name', function (done) {
                var value = {
                    id: 100,
                    name: "anu",
                    age: 22,
                    address: "covai",
                    password: "hash"
                }
                chai.request(server)
                    .put('/api/v1/put/query?name=deva')
                    .set('Authorization', token)
                    .send(value)
                    .end((err, res) => {
                        res.should.have.status(404);
                        done()
                    });
            });
            it('/update by the name ', function (done) {
                var value = {
                    id: 1,
                    name: "akil",
                    age: 20,
                    address: "chennai",
                    password: "hash"
                }
                chai.request(server)
                    .put('/api/v1/put/query?name=ajay')
                    .set('Authorization', token)
                    .send(value)
                    .end((err, res) => {
                        res.should.have.status(200);
                        done()
                    });
            });
        });
    });
    describe('register by the details', () => {
        it('/register the exist id ', function (done) {
            var value = {
                id: 1,
                name: 'ajith1',
                age: 22,
                address: "maduari",
                password: 'hash'
            }
            chai.request(server)
                .post('/auth/register')
                .send(value)
                .end((err, res) => {
                    res.should.have.status(404);
                    done()
                });
        });
        it('/register the correct id ', function (done) {
            var value = {
                id: 3,
                name: "akil",
                age: 23,
                address: "thanjavur",
                password: "hash"
            }
            chai.request(server)
                .post('/auth/register')
                .send(value)
                .end((err, res) => {
                    res.should.have.status(200);
                    done()
                });
        });
    });
    describe.only('authentication', () => {
        it('authenticate the worng user and password', function (done) {
            chai.request(server)
                .post('/auth/authenticate')
                .send('the user info not found')
                .end((req, res) => {
                    res.should.have.status(405);
                    done();
                });
        });
        it('authenticate the worng user and password', function (done) {
            let data = {
                id: 21,
                password: "ajith"
            }
            chai.request(server)
                .post('/auth/authenticate')
                .send(data)
                .end((req, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
        it('authenticate the correct user and password', function (done) {
            let data = {
                id: 3,
                password: "hash"
            }
            chai.request(server)
                .post('/auth/authenticate')
                .send(data)
                .end((req, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    })
});

