const app = require('./app');
const chai = require('chai');
const chaihttp = require('chai-http');
const should = chai.should();

chai.use(chaihttp);

describe('project management', () => {

    describe('/GET', () => {
        it('get the details', (done) => {
            chai.request(app)
                .get('/api/v1/get')
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                })
        })
    })
});
