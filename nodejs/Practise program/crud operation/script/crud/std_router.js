const express = require("express");
const std_controller = require('./std_controller.js');
const router = express();
const bodyParser = require("body-parser");
const path = require ('path');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.static(path.resolve(__dirname,'public')));

router.get('/api/std_dtl', std_controller.get_dtl);
//router.get('/api/std_dtl/:id', std_controller.getID);
router.post('/api/std_dtl', std_controller.post_dtl);
//router.put('/api//std_dtl/:id', std_controller.put_dtl);
//router.delete('/api/std_dtl/:id', std_controller.delete_dtl);

const port = process.env.PORT || 5000;
router.listen(port, () => console.log(`the server listen ${port}......`));

module.exports = { router };