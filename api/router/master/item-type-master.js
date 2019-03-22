/* Import Modules */
const mongoose = require('mongoose');
const express = require('express');
const router = express();


 /* Importing Item Type Master Controller */
 const ItemTypeMasterController = require('../../controller/master/item-type-master');


/* Get All Item Type Master Details */
router.get('/',ItemTypeMasterController.get_item_type_master);

/*Save Item Type Master */
router.post('/',ItemTypeMasterController.save_item_type_master);

/* Update Item Type Master */
router.put('/',ItemTypeMasterController.update_item_type_master);

/*Delete Item Type Master */
router.patch('/',ItemTypeMasterController.delete_item_type_master);


module.exports = router;