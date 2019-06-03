//imports the all modules
const express = require('express');
const router = express();
const bodyparser = require('body-parser');
const verifytoken = require('./Authenticationcontroller/verifyToken')
const user = require('./routes/server');
const prjController = require('./controller/prjcontroller');
//const db = require('./model/model')

//Encoded in incoming request
router.use(bodyparser.urlencoded({ extended: false }));
//parse the incoming request
router.use(bodyparser.json());

router.use('/users', user);

router.use(verifytoken);

//verifytoken is Give the permission to Access the data
router.get('/api/v1/get', prjController.getDtl);

router.get('/api/v1/query', prjController.getID);

router.post('/api/v1/post', prjController.postDtl);

router.put('/api/v1/query', prjController.putDtl);

router.delete('/api/v1/query', prjController.deleteDtl);

//connect to the server
const port = process.env.PORT || 5000;
router.listen(port, () => console.log(`the server listen ${port}......`));

module.exports = router;