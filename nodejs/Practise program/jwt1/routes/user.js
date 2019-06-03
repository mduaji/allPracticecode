const express = require('express');
const router = express();
const bodyparser = require('body-parser');
const verifytoken = require('../verifyToken')
const user = require('../routes/server');
const prjController = require('../controller/prjcontroller');

router.use(bodyparser.urlencoded({ extended: false }));

router.use(bodyparser.json());

router.use('/users',user)

router.get('/api/v1/get', verifytoken,prjController.getDtl);

router.get('/api/v1/query', verifytoken, prjController.getID);

router.post('/api/v1/post', verifytoken, prjController.postDtl);

router.put('/api/v1/query', verifytoken, prjController.putDtl);

router.delete('/api/v1/query', verifytoken, prjController.deleteDtl);

const port = process.env.PORT || 5000;
router.listen(port, () => console.log(`the server listen ${port}......`));

module.exports = router;