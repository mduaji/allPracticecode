const express = require('express');
const router = express();
const user = require('../Authentication/auth');
//post  the register data
router.post('/register', user.postcreate);
//Authenticate the request data and generate the token
router.post('/authenticate', user.postAuthenticate);


module.exports = router;