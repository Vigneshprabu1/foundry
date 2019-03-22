const express = require('express');
const router = express.Router();

const mailcontroller=require('../controller/mail')

router.post('/',mailcontroller.mail_save);
router.get('/',mailcontroller.mail_get_all);
router.put('/',mailcontroller.mail_update);


module.exports=router;