const express = require('express');

const router = express();

const prjController = require ('./controller');

module.exports = (app) => {

    router.get('/api/v1/get', prjController.getDtl);
    
    // router.get('/api/v1/get/:id', prjController.getID);
    
    // router.post('/api/v1/post', prjController.postDtl);
    
    // router.put('/api/v1/put/:id', prjController.putDtl);
    
    // router.delete('/api/v1/delete/:id', prjController.dlteDtl);
    
    router.use(app);
    }