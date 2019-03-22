/*  Importing Mongoose Module */
const mongoose = require('mongoose');
const express= require('express');
const router= express();

/* Controller */
const SandDisposalMasterController = require('../../controller/master/sand-disposal-master');

/* Get All sand_disposal Master Details */
router.get('/',SandDisposalMasterController.get_sand_disposal_master);

/*Save sand_disposal Master */
router.post('/',SandDisposalMasterController.save_sand_disposal_master);

/* Update sand_disposal Master */
router.put('/',SandDisposalMasterController.update_sand_disposal_master);

/*Delete sand_disposal Master */
router.patch('/',SandDisposalMasterController.delete_sand_disposal_master);


module.exports = router;