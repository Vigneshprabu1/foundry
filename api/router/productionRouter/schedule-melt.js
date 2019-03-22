/* import module */
const mongoose=require('mongoose');
const express=require('express');
const router=express();

/* controller */
const scheduledMeltController=require('../../controller/production/schedule-melt');

/* getting all data sorting depends upon delivery date */
router.get('/',scheduledMeltController.schedule_melt_get_all);

/* getting all data */
router.get('/all',scheduledMeltController.schedule_melt_get);

/* based on customer getting data */
router.get('/:customerName',scheduledMeltController.schedule_melt_get_customer);

/* save scheduled melt details */
router.post('/',scheduledMeltController.save_scheduled_melt);

module.exports=router;