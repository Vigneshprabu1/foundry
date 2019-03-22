
const express = require('express');

const router = express.Router();

let upload = require('../config/fileUpload.config');

const homePage = require('../controller/homepage');

router.post('/upload', upload.array("file[]",10), homePage.uploadFile);

router.get('/all', homePage.listUrlFiles);
 
router.get('/:filename', homePage.downloadFile);
 
router.get('/',homePage.readtxt);

router.get('/news.txt',homePage.readnews);

router.get('/markque.txt',homePage.readmark)

router.delete('/delete',homePage.deleteFile)
module.exports=router;