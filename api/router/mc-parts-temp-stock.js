const express = require('express');
const router = express.Router();
const mcPartsTempStockController=require('../controller/mc-parts-temp-stock')

router.get('/',mcPartsTempStockController.mc_parts_temp_stock_get);

module.exports=router;

