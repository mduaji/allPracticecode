const express = require('express');
const router = express();
const user = require('../controller/user');

router.post('/register', user.postcreate);
router.post('/authenticate', user.postAuthenticate);


module.exports = router;