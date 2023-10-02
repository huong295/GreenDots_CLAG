const ControllerUpload = require('../controllers/upload.c');
const ControllerTool = require('../controllers/ai_tools.c');

const router = app => {
    // return information
    app.get('/trash-info/:id', ControllerTool.trashInfoGet);
    app.get('/trash-locations/:id', ControllerTool.trashLocationGet);
    // upload image and receive result 
    app.post('/upload', ControllerUpload.uploadSingleFile); 
}


// export the router
module.exports = router;
