const mongoose = require("mongoose");
const chai = require('chai');
const Schema = mongoose.Schema;
const expect = chai.expect;

const testSchema = new Schema({
    name: { type: String, required: true }
});

const emp = mongoose.model('emp', testSchema);

before((done) => {
    mongoose.connect('mongodb://localhost:27017/empdb');
    const db = mongoose.connection;
    db.on('error'.console.error.bind(console, 'connection err0'));
    db.once('open', () => {
        console.log('db connected');
        done();
    });
});
describe('empdb', () => {
    it('new name saved to the database', (done) => {
        var empName = emp({
            name: 'Ajith'
        });
        empName.save(done);
    });
    it('donit save the database', (done) => {
        var emprname = emp({
            name: 'not ajith'
        })
        emprname.save(err => {
            if (err) { return done() }
            console.log('generate error');
        });
        it("it should retrive data from database", (done) => {
            emp.find({ name: 'ajith' }, (err, name) => {
                if (err) throw err;
                if (name.length == 0) throw err;
                done();
            });
        });
    });
    after((done) => {
        mongoose.connection.db.dropDatabase(() => {
            mongoose.connection.close(done);
        });
    });
});