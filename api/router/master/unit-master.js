const express = require('express');
const router = express.Router();
const unitMasterController = require('../../controller/master/unit-master');

router.post('/', unitMasterController.unitMaster_save);
router.get('/', unitMasterController.unitMaster_get_all);
router.put('/',unitMasterController.unitMaster_update);
router.patch('/',unitMasterController.unitMaster_delete);

module.exports = router;