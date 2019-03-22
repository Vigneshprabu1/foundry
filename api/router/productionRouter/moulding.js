
/**import module */

const express=require('express');
const router=express();

/**  Controller */
const mouldingController=require('../../controller/production/moulding');


/* getting moulding data using batchId */
router.get('/:batchId',mouldingController.moulding_get_particular);

/* checking the moulding process completed or not using meltNo */
router.get('/checkMoulding/:meltno',mouldingController.completed_moulding_or_not);

/* moulding update */
router.patch('/:mouldId',mouldingController.moulding_update);

module.exports=router;

