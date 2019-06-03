const chai = require('chai');
const should = chai.should();
const chaihttp = require('chai-http');
const server = require('../app');
chai.use(chaihttp);

describe('Register Details ', () => {
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
                    done();
                })
        })
        it('register already exists column', function (done) {
            let data = {
                Name: 'Ajith',
                Email: 'ajith@gmail.com',
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
                    done();
                });
        });
        it('register the details using /post', function (done) {
            let data = {
                Name: 'Ajith',
                Email: 'ajith@gmail.com',
                MobileNo: '1234567892',
                Age: 23,
                Gender: 'Male',
                Address: 'Madurai'
            }
            chai.request(server)
                .post('/api/v1/register')
                .send(data)
                .end((req, res) => {
                    res.should.have.status(200);
                    // res.boby.should.be('object');
                    done();
                });
        });
    });
    describe.only('should authenticate the details', () => {
        it.only('Should not found the user information', function (done) {
            chai.request(server)
                .post('/api/v1/auth')
                .send('InvalidId')
                .end((req, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
        it('authenticate with wrong password or id', function (done) {
            let data = {
                projectId: 'ajith@gmail.com',
                password: "asaa"
            }
            chai.request(server)
                .post('/api/v1/auth')
                .send(data)
                .end((req, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
        it('Authenticate the details using /post', function (done) {
            let auth = {
                projectId: 'ajith@gmail.com',
                password: "ajith"
            }
            chai.request(server)
                .post('/api/v1/auth')
                .set('content-type', 'application/json')
                .send(auth)
                .end((req, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object')
                    done();
                });
        });

    });
})