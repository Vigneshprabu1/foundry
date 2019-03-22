/* Import Modules */
const mongoose = require('mongoose');
const express = require('express');
const router = express();


 /* Importing Item Type Master Controller */
 const LabourMasterController = require('../../controller/master/labour-master');


/* Get contract Labour Master Details */
router.get('/',LabourMasterController.get_contract_labour_master);

/*Get Permament Labour Master  */
router.get('/permanent',LabourMasterController.get_permanent_labour_master);


/*Save Labour Master */
router.post('/',LabourMasterController.save_labour_master);

/* Update Labour Master */
router.put('/',LabourMasterController.update_labour_master);

/* Get Labour based On activity type*/
router.patch('/:type',LabourMasterController.get_labour_master_using_activity_type);

/*Delete Labour Master */
router.patch('/',LabourMasterController.delete_labour_master);


module.exports = router;