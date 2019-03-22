/* Import Modules */
const mongoose = require('mongoose');
const express = require('express');
const router = express();


 /* Importing Item Type Master Controller */
 const LpgMasterController = require('../../controller/master/lpg-master');


/* Get All Lpg Master Details */
router.get('/',LpgMasterController.get_lpg_master);

/*Save Lpg Master */
router.post('/',LpgMasterController.save_lpg_master);

/* Update Lpg Master */
router.put('/',LpgMasterController.update_lpg_master);

/*Delete Lpg Master */
router.patch('/',LpgMasterController.delete_lpg_master);


module.exports = router;