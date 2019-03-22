const express = require('express');
const router = express.Router();
const companyMasterController = require('../../controller/master/company-master');

router.post('/', companyMasterController.company_master_save);
router.get('/', companyMasterController.company_master_get_all);
router.put('/',companyMasterController.company_master_update);
router.patch('/',companyMasterController.companyMaster_delete);

module.exports = router;