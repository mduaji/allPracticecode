//const dbCon = require('../model/dbconnection');
const chai = require('chai');
const chaihttp = require('chai-http');
const expect = chai.expect;
const router = require('../route/router');

chai.use(chaihttp);

describe('project Management', () => {

    // describe('project Management', () => {

    //     beforeEach('db will be clear', (done) => {
    //         dbCon.remove({}, (err) => {
    //             done();
    //         });
    //     });
    // });

    describe('/ GET the Details', () => {

        it('should be get the value', (done) => {
            chai.request(router)
                .get('/api/v1/get')
                .then((res) => {
                    expect(res).to.have.status(200);
                    expect(res).type.to.be.json;
                    expect(res.body).to.be.an(Object);
                }).catch((err) => {
                    expect(err).to.have.status(400);
                });
        });
    });

    describe('/ GET the ID Details', () => {

        it('should be get the particular id', (done) => {
            const id = 1;
            chai.request(router)
                .get(`/api/v1/get/${id}`)
                .then((res) => {
                    expect(res).to.have.status(200);
                    expect(res).type.to.be.json;
                    expect(res.body).to.be.an(Object);
                }).catch((err) => {
                    expect(err).to.have.status(400);
                });
        });
    });

    describe('/ POST the Details', () => {

        it('should be insert the details', (done) => {
            const data = {
                projectId: 3,
                projectName: "data-migration",
                startDate: "2018-04-03",
                endDate: "2018-09-01",
                projectDuration: 15,
                totalPrjHours: 500,
                prjManager: "Akil",
                prjDesc: "data will be migrated"
            }
            chai.request(router)
                .post('/api/v1/post/')
                .send(data)
                .then((res) => {
                    expect(res).to.have.status(200);
                    expect(res).type.to.be.json;
                    expect(res.body).to.be.an(Object);
                }).catch((err) => {
                    expect(err).to.have.status(400);
                });
        });
    });
    describe('/ PUT the Details', () => {

        it('should be update the details', (done) => {
            const data = {
                projectName: "data-migration",
                startDate: "2018-04-03",
                endDate: "2018-09-01",
                projectDuration: 15,
                totalPrjHours: 500,
                prjManager: "Akil",
                prjDesc: "data will be migrated"
            }
            const uptID = 2;
            chai.request(app)
                .post(`/api/v1/put/${uptID}`)
                .send(data)
                .then((res) => {
                    expect(res).to.have.status(200);
                    expect(res).type.to.be.json;
                    expect(res.body).to.be.an(Object);
                }).catch((err) => {
                    expect(err).to.have.status(400);
                });
        });
    });

    describe('/ Delete the ID Details', () => {

        it('should be Delete the particular id', (done) => {
            const id = 1;
            chai.request(router)
                .get(`/api/v1/delete/${id}`)
                .then((res) => {
                    expect(res).to.have.status(200);
                }).catch((err) => {
                    expect(err).to.have.status(400);
                });
        });
    });

});
