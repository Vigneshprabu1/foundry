/* imported module */
const express = require('express');
const router = express.Router();

/* controller */
const coreMakingController = require('../../controller/master/core-making-master');
/*get core making by moldType */
router.get('/:moldType',coreMakingController.get_core_master_by_mold_type);
/* getting all details */
router.get('/',coreMakingController.get_all_core_making_master);

/* save the core making master  */
router.post('/',coreMakingController.save_core_masking_master);

/* update the core making master */
router.put('/',coreMakingController.update_core_making_master);

/* deleting the core making master */
router.patch('/',coreMakingController.delete_core_making_master);

module.exports=router;
