/* import module */
const mongoose=require('mongoose');
const express=require('express');
const router=express();

/* controller */
const tempScheduledMeltController=require('../../controller/production/temp-scheduled-melt');

/* save temp schedule melt*/
router.post('/',tempScheduledMeltController.save_temp_sch_melt);

module.exports=router;