const express = require('express');
const router = express.Router();
const activityMasterController = require('../../controller/master/activity-master');

router.post('/', activityMasterController.activity_master_save);
router.get('/', activityMasterController.activity_master_get_all);
router.put('/',activityMasterController.activity_master_update);
router.patch('/',activityMasterController.activityMaster_delete);

module.exports = router;