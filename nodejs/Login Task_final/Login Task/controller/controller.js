const con = require('../model/model');

const getDtl = (req, res) => {
    const sql = 'SELECT * FROM datadb'
    con.query(sql, (err, result) => {
        if (!result) {
            res.status(404).json({
                status: 'Error'
            });
        }
        else {
            res.status(200).json({
                status: "Success",
                Data: result
            });
        }
    });
};

con.connect((err) => {
    if (err) {
        console.log('db connection error');
    }
    else {
        console.log('db connected');
    }
});

module.exports = { getDtl };