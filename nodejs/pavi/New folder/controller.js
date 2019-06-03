var bcrypt = require('bcryptjs');
var mysql = require('mysql');
var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'db'
});
con.connect(() => {
    console.log('db connected');
})
const postDt = (req, res) => {
    const password = bcrypt.hashSync(req.body.password);
    // const newemployee = {
    //     id: req.body.id,
    //     name: req.body.name,
    //     mobileno: req.body.mobileno,
    //     email: req.body.email,
    //     projectid: req.body.projectid,
    //     comments: req.body.comments,
    //     password: password
    // }

    //console.log(newemployee);
    let sql = 'call post_query_sp(?,?,?,?,?,?,?)';
    // let sql = 'insert into employee set ?'

    con.query(sql, 
        [req.body.id,req.body.name,req.body.mobileno,req.body.email,req.body.projectid,req.body.comments,password], 
        (err, employeeDt) => {
        console.log(employeeDt)
        if (!employeeDt) {
            return res.status(404).send("This id is already in use.");
        }
        res.json(employeeDt);

    })
}
//[req.body.id,req.body.name,req.body.mobileno,req.body.email,req.body.projectid,req.body.comments,password]
const getDt = (req, res) => {
    let sql = 'call employee_dt()';
    con.query(sql, (err, employeeDt) => {
        res.send(employeeDt);
    })
}
const getById = (req, res) => {
    if (req.query.id) {
        var id = req.query.id;
        let sql = 'call employee_id(?)'
        con.query(sql, [id], (err, employeeDt) => {
            if (!employeeDt.length > 0) {
                return res.status(404).send("The given id is not found.");
            }
            res.send(employeeDt)
        })
    }
    else if (req.query.name) {
        var name = req.query.name;
        let sql = 'call employee_name(?)'
        con.query(sql, [name], (err, employeeDt) => {
            if (!employeeDt.length > 0) {
                return res.status(404).send("The given id is not found.");
            }
            res.send(employeeDt)
        })
    }
}
const deleteDt = (req, res) => {
    if (req.query.id) {
        var id = req.query.id;
        let sql = 'call employee_delete(?)';
        con.query(sql, [id], (err, employeeDt) => {
            if (employeeDt.affectedRows == 0) {
                return res.status(404).send("The given id is not found for delete request.");
            }
            res.send(employeeDt);
        })
    }
    else if (req.query.name) {
        var name = req.query.name;
        let sql = 'call employee_delete_name(?)'
        con.query(sql, [name], (err, employeeDt) => {
            if (employeeDt.affectedRows == 0) {
                return res.status(404).send("The given id is not found for delete request.");
            }
            res.send(employeeDt);
        })
    }
}
const putDt = (req, res) => {
    if (req.query.id) {
        var id = req.query.id;
        const password = bcrypt.hashSync(req.body.password);
        const newemployee = {
            name: req.body.name,
            mobileno: req.body.mobileno,
            email: req.body.email,
            projectid: req.body.projectid,
            comments: req.body.comments,
            password: password
        }
        //console.log(newemployee);
        con.query('UPDATE employee SET ? WHERE id = ?', [newemployee, id], (err, employeeDt) => {
            //console.log(employeeDt);
            if (employeeDt.affectedRows == 0) {
                return res.status(404).send("There was a problem updating the employee.");
            } else {
                res.send(employeeDt);
            }
        })
    }
    else if (req.query.name) {
        var name = req.query.name;
        const password = bcrypt.hashSync(req.body.password);
        const newemployee = {
            id: req.body.id,
            mobileno: req.body.mobileno,
            email: req.body.email,
            projectid: req.body.projectid,
            comments: req.body.comments,
            password: password
        }
        //console.log(newEmployee);
        con.query('UPDATE employee SET ? WHERE name = ?', [newemployee, name], (err, employeeDt) => {
            if (employeeDt.affectedRows == 0) {
                return res.status(404).send("There was a problem updating the employee.");
            } else {
                res.send(employeeDt);
            }
        })
    }
}
module.exports = { postDt, getDt, getById, putDt, deleteDt };