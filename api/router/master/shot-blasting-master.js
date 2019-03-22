const express = require('express');
const router = express.Router();
const shotBlastingMasterController = require('../../controller/master/shot-blasting-master');

router.post('/', shotBlastingMasterController.shotBlastingMaster_save);

router.get('/consumable', shotBlastingMasterController.shotBlastingMaster_get_consumable);

router.get('/part',shotBlastingMasterController.shotBlastingMaster_get_part);

router.put('/',shotBlastingMasterController.shotBlastingMaster_update);

router.patch('/',shotBlastingMasterController.shotBlasting_delete);

module.exports = router;