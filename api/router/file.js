const express = require('express');

const router = express.Router();

let upload = require('../config/fileUpload.config');

const fileController=require('../controller/file')


router.post('/:id',upload.array("uploads[]", 2),fileController.uploadFile);

router.get('/:filename', fileController.downloadFile);

module.exports=router;