const express = require('express');
const router = express.Router();
const vendorController=require('../controller/vendor');

router.get('/',vendorController.vendor_get_all);
router.post('/',vendorController.vendor_saves);
router.patch('/:vendorId',vendorController.vendor_updation);
router.put('/:vendorId',vendorController.vendor_delete);
router.get('/sandDisposal',vendorController.vendor_get_sand_disposal);
router.get('/:itemType',vendorController.vendor_type_get);
router.get('/name/:vendorName',vendorController.get_vendor);
module.exports = router; 
   