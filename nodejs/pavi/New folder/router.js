var express = require('express');
var router = express();
var controller = require('./controller');
var verifyToken = require('./verifyToken');

//router.use(verifyToken);
router.post('/api', controller.postDt);
router.get('/api', controller.getDt);
router.get('/api/get/', controller.getById);
router.delete('/api/delete/', controller.deleteDt);
router.put('/api/put/', controller.putDt);

module.exports = router;