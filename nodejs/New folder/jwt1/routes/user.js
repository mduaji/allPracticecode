const express = require('express');
const router = express();
const bodyparser = require('body-parser');
const verifytoken = require('../verifyToken')
//var user = require('../routes/server');
var user = require('../controller/user');
//const data = require('./routes/user');
const prjController = require('../controller/prjcontroller');

router.use(bodyparser.urlencoded({ extended: false }));

router.use(bodyparser.json());

router.post('/register', user.postcreate);
router.post('/authenticate', user.postAuthenticate);

router.get('/api/v1/get', verifytoken,prjController.getDtl);

router.get('/api/v1/get/:id', verifytoken, prjController.getID);

router.post('/api/v1/post', verifytoken, prjController.postDtl);

router.put('/api/v1/put/:id', verifytoken, prjController.putDtl);

router.delete('/api/v1/delete/:id', verifytoken, prjController.deleteDtl);

const port = process.env.PORT || 5000;
router.listen(port, () => console.log(`the server listen ${port}......`));

module.exports = router;