const express = require('express');
const router = express.Router();
const tempStockController=require('../controller/temp-stock')

router.get('/',tempStockController.tempStock_get)

module.exports=router;