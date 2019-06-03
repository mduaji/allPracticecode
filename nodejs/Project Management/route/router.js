//imports the express module
const express = require("express");

//imports the body-parser module
//const bodyparser = require("body-parser");

//imports the  controller
const prjController = require("../controller/prjMngController.js");

//initialize express router
const router = express();

//use middleware function body-parser
 router.use(bodyparser.json());

//parse the incoming request
router.use(bodyparser.urlencoded({ extended: true }));



//Send the api to get details
router.get('/api/v1/get', prjController.getDtl);

//send the api to get particular details
router.get('/api/v1/get/:id', prjController.getID);

//send the api to insert  details
router.post('/api/v1/post', prjController.postDtl);

//send the api to update details
router.put('/api/v1/put/:id', prjController.putDtl);

//send the api to delete details
router.delete('/api/v1/delete/:id', prjController.dlteDtl);







//connect the localhost port
const port = process.env.PORT || 5000;
router.listen(port, () => console.log(`the server listen ${port}......`));

module.exports = router;

