/* import module */
const mongoose=require('mongoose');
const express=require('express');
const router=express();

/* controller */
const MeltController = require('../../controller/production/Melt');

/* getting all melt details */
router.get('/',MeltController.get_all_melt);

/* get Current MeltStatus */
router.get('/meltStatus',MeltController.get_current_meltStatus);

/* get Current BatchStatus */
router.get('/batchStatus',MeltController.get_current_batchStatus);


/* update the melt  */
router.patch('/:_id', MeltController.update_current_melt);

/* update melt status */
router.patch('/statusUpdate/:meltNo',MeltController.status_update);

/* update the batch status */
router.get('/batchStatusUpdation/:meltNo',MeltController.batch_status_updation);

/* get Recently completed Melt */
router.get('/recentlyCompletedMelts',MeltController.get_recently_completed_melts);

module.exports = router;
