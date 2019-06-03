//imports the all modules
const express = require('express');
const router = express();
const bodyparser = require('body-parser');
 const verifytoken = require('./Authentication/verifytoken')
 const user = require('./routes/server');
const prjController = require('./controller/controller');
var cors = require('cors');
//const db = require('./model/model')
router.use(cors());

//To Parse the URL Encoded data
router.use(bodyparser.urlencoded({ extended: false }));
// To Parse the json data
router.use(bodyparser.json());

router.use('/users', user);

// router.use(verifytoken);

router.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    
    next();
});
// router.use(cors({origin: 'http://localhost:8082'}));

//Route Handler to Send the Response
router.get('/api/v1/get', prjController.getDtl);

router.get('/api/v1/query', prjController.getID);

router.post('/api/v1/post', prjController.postDtl);

router.put('/api/v1/put/:Id', prjController.putDtl);

router.delete('/api/v1/delete/:Id', prjController.deleteDtl);

//connect to the server
const port = process.env.PORT || 5000;
router.listen(port, () => console.log(`the server listen ${port}......`));

module.exports = router;