/* Import Modules */
const mongoose = require('mongoose');
const express = require('express');
const router = express();


 /* Importing machine_details Master Controller */
 const LpgMasterController = require('../../controller/master/machine-details');

/* Get  Machine Details Details  by activity Type*/
router.get('/:type',LpgMasterController.get_machine_details_by_activity_type);

/* Get All Machine Details Details */
router.get('/',LpgMasterController.get_machine_details);

/*Save Machine Details */
router.post('/',LpgMasterController.save_machine_details);

/* Update Machine Details */
router.put('/',LpgMasterController.update_machine_details);

/*Delete Machine Details */
router.patch('/',LpgMasterController.delete_machine_details);


module.exports = router;