const express = require('express');
const router = express.Router();
const itemsController = require('../controller/items');
router.get('/itemCategory/:category',itemsController.get_items_by_item_category);
router.get('/getitem', itemsController.items_all);
router.get('/itemType', itemsController.get_items_by_itemTypes);
router.get('/name/:itemName', itemsController.get_items_by_name);
router.get('/:type/:category',itemsController.get_items_by_item_type);
router.get('/', itemsController.items_get_all);
router.post('/', itemsController.item_save);
router.patch('/:itemsId', itemsController.item_update);
router.put('/:itemsId', itemsController.items_delete);
router.get('/getRawMaterialItems', itemsController.get_raw_material_items);


module.exports = router;