/* Modules */
const mongoose=require('mongoose');
const express=require('express');
const router=express();

/* Controller */
const completedMeltController=require('../../controller/production/completed-melt');


/* get completed Melt List */
router.get('/',completedMeltController.completed_melt_get_all);

/* get ongoing melt data and stored in completed melt */
//router.patch('/batchId/:batchId',completedMeltController.completed_melt_and_ongoing_melt);

module.exports=router;