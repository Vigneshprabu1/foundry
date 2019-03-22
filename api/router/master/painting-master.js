const express = require('express');
const router = express.Router();
const paintingMasterController = require('../../controller/master/painting-master');

router.post('/', paintingMasterController.paintingMaster_save);
router.get('/', paintingMasterController.paintingMaster_get_all);
router.put('/',paintingMasterController.paintingMaster_update);
router.patch('/',paintingMasterController.painting_delete);

module.exports = router;