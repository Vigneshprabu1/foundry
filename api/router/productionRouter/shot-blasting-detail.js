
/*Imported  Modules */
const mongoose=require('mongoose');
const express=require('express');
const router=express();

/* Controller */
const shotBlastingController=require('../../controller/production/shot-blasting-detail');

/* Save Shot Blasting Details */
router.post('/',shotBlastingController.shot_blasting_detail_save);

/* Get Paticular data from DB using BatchId */
router.get('/:shotBlastingBatchId',shotBlastingController.shot_blasting_detail_get_particular);


/* update shot blasting details*/
router.patch('/:shotblastingId',shotBlastingController.shot_blasting_detail_update);


/*check whether all batch shot blasting details are completd or not*/
router.get('/checkShotBlasting/:meltNo',shotBlastingController.shot_blasting_detail_check);

/* Exports router */
module.exports=router;