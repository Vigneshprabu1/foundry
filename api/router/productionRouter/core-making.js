/* import module */
const mongoose=require('mongoose');
const express=require('express');
const router=express();

/* controller */
const coreMakingController=require('../../controller/production/core-making');


router.get('/:batchId',coreMakingController.get_current_core_making_using_batchId);
// /* core making save */
// router.post('/',coreMakingController.core_making_save);

/* core making update using objectId */
router.patch('/',coreMakingController.update_core_making);



module.exports=router;