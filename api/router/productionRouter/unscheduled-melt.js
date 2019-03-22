/* import module */
const mongoose= require('mongoose');
const express = require('express');
const router = express();
/* controller */
const UnscheduledMeltController = require('../../controller/production/unscheduled-melt');

/* getting all info from DB with the limit of 5 sort by delivery date */
router.get('/',UnscheduledMeltController.unschedule_melt_get_all);

/* get all unscheduled melt */
router.get('/all',UnscheduledMeltController.unschedule_melt_get);

/* get unscheduled melt using customername */
router.get('/:customerName',UnscheduledMeltController.unschedule_melt_get_customer);

module.exports = router;
