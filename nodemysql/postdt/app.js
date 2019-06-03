const express = require('express');
const router = express();
const bodyParser = require('body-parser');
var cors = require('cors');
var joi = require('joi')
const schema = require('./joi')
router.use(cors());
var mysql = require('mysql');
var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'postdt'
});
con.connect(() => {
    console.log('db connected');
})

router.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
});

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/api/get', (req, res) => {
    const sql = 'SELECT * FROM empdtl'
    con.query(sql, (err, result) => {
        res.status(200).json(result);
    })
});
router.get('/api/getlist', (req, res) => {
    const sql = "select * from categoriestbl"
    con.query(sql, (err, result) => {
        res.status(200).json(result);
    })
})
router.get('/api/getctId/:id', (req, res) => {
    const Id = req.params.id
    const sql = "select * from categoriestbl where CategoryId=?"
    con.query(sql, [Id], (err, result) => {
        if (err) {
            res.status(404).json(err)
        } else {
            res.status(200).json(result);
        }
    })
})
router.get('/api/v1/get/count', (req, res) => {
    const sql = 'SELECT COUNT(*) cnt FROM empdtl'
    con.query(sql, (err, result) => {
        res.status(200).send(result);
    })
});

router.post('/api/postcategories', (req, res) => {
    console.log(req.body)
    const sql = "insert into categoriestbl (Category,Users) values ?"
    // const data = [req.body.map(item => [item.Category, item.Users])]
    //console.log(data)
    con.query(sql, [req.body.Category, req.body.Users], (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json(result);
        }
    })
})
router.post('/api/v1/post', (req, res) => {
    joi.validate(req.body, schema, (err, validationresult) => {
        console.log(req.body)
        if (err) {
            res.status(404).json({ status: 'Error', Error: err });
        }
        else {
            console.log(validationresult)
            const sql = "insert into empdtl (EmpId,Name,Role,PreOrganization) values ?"
            con.query(sql,
                [validationresult.map(item => [item.EmpId, item.Name, item.Role, item.PreOrganization])],
                (err, result) => {
                    if (err) {
                        res.status(404).send(err);
                    } else {
                        res.status(200).send(result);
                    }

                });
        }
    });
});

router.delete('/api/v1/delete/:id', (req, res) => {
    const Id = parseInt(req.params.id)
    const sql = 'delete From empdtl where EmpId=?'
    con.query(sql, [Id], (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json(result);
        }
    })
});

router.delete('/api/deleteId/:Id', (req, res) => {
    const id = parseInt(req.params.Id)
    console.log(id);
    const sql = 'delete From categoriestbl where CategoryId=?'
    con.query(sql, [id], (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json(result);
        }
    })
});

router.put('/api/v1/put/:id', (req, res) => {
    const id = req.params.id
    console.log(id)
    const sql = " update empdtl set Name=?,Role=?,PreOrganization=? where EmpId=?"
    con.query(sql, [req.body.Name, req.body.Role, req.body.PreOrganization, id], (err, result) => {
        if (err) {
            res.status(404).json(err)
        } else {
            res.status(200).json(result)
        }
    })

})
router.delete('/api/v1/deleteMany', (req, res) => {
    //console.log(req.query)
    console.log(JSON.parse(req.query.EmpId))
    const Id = (JSON.parse(req.query.EmpId))
    const sql = 'delete From empdtl where EmpId in (?)'
    con.query(sql, [Id], (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json(result);
        }
    })
});
router.put('/api/updtcategoreies/:id', (req, res) => {
    const id = req.params.id
    console.log(id)
    const sql = " update categoriestbl set Category=?,Users=? where CategoryId=?"
    con.query(sql, [req.body.Category, req.body.Users, id], (err, result) => {
        if (err) {
            res.status(404).json(err)
        } else {
            res.status(200).json(result)
        }
    })

})

const port = process.env.PORT || 5000;
router.listen(port, () => {
    console.log(`Server connected on ${port}`);
})
module.exports = router;