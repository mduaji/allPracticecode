const express = require('express');
const router = express();
const authcontroller = require('../authentication/auth')

router.post('/register', authcontroller.postregister);
router.post('/authenticate', authcontroller.postauth);

module.exports = router;