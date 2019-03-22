const express = require('express');
const router = express.Router();
const fettlingMasterController = require('../../controller/master/fettling-master');

router.post('/', fettlingMasterController.fettlingMaster_save);

router.get('/consumable', fettlingMasterController.fettlingMaster_get_consumable);

router.get('/part', fettlingMasterController.fettlingMaster_get_part);

router.put('/',fettlingMasterController.fettlingMaster_update);

router.patch('/',fettlingMasterController.fettling_delete);

module.exports = router;