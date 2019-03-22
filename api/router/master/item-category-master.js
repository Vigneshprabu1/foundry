/*  Importing Mongoose Module */
const mongoose = require('mongoose');
const express= require('express');
const router= express();


const ItemCategoryMasterController = require('../../controller/master/item-category-master');

router.get('/',ItemCategoryMasterController.get_item_category_master);
router.post('/',ItemCategoryMasterController.save_item_category_master);
router.put('/',ItemCategoryMasterController.update_item_category_master);
router.patch('/',ItemCategoryMasterController.delete_item_category_master);


module.exports = router;