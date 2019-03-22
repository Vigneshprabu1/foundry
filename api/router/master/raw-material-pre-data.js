const express = require('express');
const router = express.Router();
const rawMaterialPreDataController = require('../../controller/master/raw-material-pre-data');

router.post('/', rawMaterialPreDataController.rawMaterialPreData_save);
router.get('/', rawMaterialPreDataController.rawMaterialPreData_get_all);
router.put('/',rawMaterialPreDataController.rawMaterialPreData_update);
router.patch('/',rawMaterialPreDataController.rawMateril_delete);

module.exports = router;