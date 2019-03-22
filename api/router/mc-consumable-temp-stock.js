

const express = require('express');
const router = express.Router();
const mcConsumableTempStockController=require('../controller/mc-consumable-temp-stock')

router.get('/',mcConsumableTempStockController.mc_consumable_temp_stock_get)

module.exports=router;