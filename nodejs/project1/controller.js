const db = require('./model');

const getDtl = (req, res) => {

    db.user.find({}, (err, result) => {
        if (err)
            console.log(err);
        else
            res.json(result);
    })
}

module.exports = { getDtl };