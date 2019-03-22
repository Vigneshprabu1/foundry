/* imported module */
const mongoose=require('mongoose');
const express=require('express');
const router=express();

/* controller */
const tempCompScheduledMeltController=require('../../controller/production/temp-comp-scheduled-melt');

/* save_temp_com_melt */
router.post('/',tempCompScheduledMeltController.save_temp_com_melt);

/* Delete Temp Schedule Melt */
router.patch('/deleteTempSchMelt', tempCompScheduledMeltController.remove_temp_sch_melt);

module.exports=router;