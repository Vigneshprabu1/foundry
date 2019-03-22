
const express=require('express');
const router=express.Router();
const billingContoller=require('../controller/billing')



router.get('/', billingContoller.save_billing);

module.exports=router;