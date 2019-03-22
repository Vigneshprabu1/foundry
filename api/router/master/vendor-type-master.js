/*  Importing Mongoose Module */
const mongoose = require('mongoose');
const express= require('express');
const router= express();

/* Controller */
const VendorTypeMasterController = require('../../controller/master/vendor-type-master');

/* Get All Item Type Master Details */
router.get('/',VendorTypeMasterController.get_vendor_type_master);

/*Save Item Type Master */
router.post('/',VendorTypeMasterController.save_vendor_type_master);

/* Update Item Type Master */
router.put('/',VendorTypeMasterController.update_vendor_type_master);

/*Delete Item Type Master */
router.patch('/',VendorTypeMasterController.delete_vendor_type_master);


module.exports = router;