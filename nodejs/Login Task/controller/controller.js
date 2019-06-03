const con = require('../model/model');

//Get the All Details In Database
const getDtl = (req, res) => {
    //Sql Selete Satement
    const sql = 'SELECT * FROM datadb'
    con.query(sql, (err, result) => {
        res.status(200).json({
            status: "Success",
            Data: result
        });
    })
};
//Db connection
con.connect();

//Exports the Module
module.exports = { getDtl };