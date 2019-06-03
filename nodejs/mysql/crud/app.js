var express = require('express');
var router = express();
var bodyparser = require('body-parser');
router.use(bodyparser.json());
router.use(bodyparser.urlencoded({ extended: true }));
const controller = require('./controller/controller');
const user = require('./user/auth');
const verifytoken = require('./verify token/token')


router.use('/auth', user);
//router.use(verifytoken);
router.get('/api/v1/get', controller.get);
router.get('/api/v1/get/query', controller.getId);
router.put('/api/v1/put/query', controller.putId);
router.post('/api/v1/post', controller.post);
router.delete('/api/v1/delete/query', controller.deleteId);


const port = process.env.PORT || 8000;
router.listen(port, () => console.log(`the server listen ${port}......`));

module.exports = router;