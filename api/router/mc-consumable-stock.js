const express = require('express');
const router = express.Router();
const mcConsumableStockController=require('../controller/mc-consumable-stock');
// router.get('/:itemName',stockController.get_Item_using_item_name);
router.get('/:itemName', mcConsumableStockController.get_skock_by_itemName);
 router.get('/',mcConsumableStockController.mc_consumable_stock_get_all);
 router.put('/',mcConsumableStockController.mc_consumable_stock_move);
 


module.exports = router;