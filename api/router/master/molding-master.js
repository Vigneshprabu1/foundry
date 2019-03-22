/*  Importing Mongoose Module */
const mongoose = require('mongoose');
const express= require('express');
const router= express();

/* Controller */
const MoldingMasterController = require('../../controller/master/molding-master');

/* Get All Molding Master Details */
router.get('/',MoldingMasterController.get_molding_master);

/*Save Molding Master */
router.post('/',MoldingMasterController.save_molding_master);

/* Update Molding Master */
router.put('/',MoldingMasterController.update_molding_master);

/*Delete Molding Master */
router.patch('/',MoldingMasterController.delete_molding_master);


module.exports = router;