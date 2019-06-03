const chai = require('chai');
const should = chai.should();
const chaihttp = require('chai-http');
const server = require('../app');
chai.use(chaihttp);

describe('Register and Authenticate the Details ', () => {
    it('should take less than 500ms', function (done) {
        this.timeout(500);
        setTimeout(done, 300);
    });
    describe('should register the details', () => {
        it('the joi validation should error', function (done) {
            let data = {
                Name: 'Ajith',
                Email: 'ajith@gmail.com',
                MobileNo: '9944572713',
                Age: 23,
                Gender: 'Male'
            }

            chai.request(server)
                .post('/api/v1/register')
                .send(data)
                .end((req, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object')
                    done();
                })
        })
        it('register already exists column', function (done) {
            let data = {
                Name: 'Ajith',
                Email: 'ajithc1096@gmail.com',
                MobileNo: '1234567890',
                Age: 23,
                Gender: 'Male',
                Address: 'Madurai'
            }
            chai.request(server)
                .post('/api/v1/register')
                .send(data)
                .end((req, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    done();
                });
        });
        it('register the details using /post', function (done) {
            let data = {
                Name: 'Ajith',
                Email: 'ajitk4n@gmail.com',
                MobileNo: '1234567765',
                Age: 23,
                Gender: 'Male',
                Address: 'Madurai'
            }
            chai.request(server)
                .post('/api/v1/register')
                .send(data)
                .end((req, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });
    describe('should authenticate the details', () => {
        it('Should not found the user information', function (done) {
            data = { Email: '124d23@gmail.com' }
            chai.request(server)
                .post('/static/api/v1/auth')
                .send(data)
                .end((req, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object')
                    done();
                });
        });
        it('authenticate with wrong password or id', function (done) {
            let data = {
                Email: 'ajithc1096@gmail.com',
                Password: "asaa"
            }
            chai.request(server)
                .post('/static/api/v1/auth')
                .send(data)
                .end((req, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object')
                    done();
                });
        });
        it('Authenticate the details using /post', function (done) {
            let auth = {
                Email: 'ajithc1096@gmail.com',
                Password: "8swHc1T"
            }
            chai.request(server)
                .post('/static/api/v1/auth')
                .send(auth)
                .end((req, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object')
                    done();
                });
        });
    });
    describe('Should Get the All Details', () => {
        it(' Get the All Details', function (done) {
            chai.request(server)
                .get('/api/v1/get')
                .end((req, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });
});