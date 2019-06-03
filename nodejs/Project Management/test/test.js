const chai = require('chai');
const chaihttp = require('chai-http');
 //const expect = chai.expect;
chai.use(chaihttp);
var should = chai.should();

const app = require('../route/app');


describe('project management', () => {

    describe(' GET the all Details', () => {
        it(' / GET', (done) => {
            chai.request(app)
                .get('/api/v1/get')
                .end((err,res) => {
                    res.should.have.status(200);
                    //expect(res).to.have.status(200);
                    //expect(res).type.to.be.json;
                    done();
                })
        });
    });
});


