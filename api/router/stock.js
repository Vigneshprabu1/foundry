const express = require('express');
const router = express.Router();
const stockController=require('../controller/stock');

router.get('/:itemName',stockController.get_Item_using_item_name);
router.get('/',stockController.stock_get_all);
router.put('/',stockController.stock_move);
router.get('/rawmaterial',stockController.stock_get_rawmaterial);
router.get('/consumable',stockController.stock_get_consumable);


module.exports = router;