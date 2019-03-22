const express = require('express');
const router = express.Router();
const mcPartsStockController=require('../controller/mc-parts-stock');
 router.get('/:itemName',mcPartsStockController.get_mc_parts_stock_by_itemName);
 router.get('/',mcPartsStockController.mc_parts_stock_get_all);
 router.put('/',mcPartsStockController.mc_parts_stock_move);



module.exports = router;