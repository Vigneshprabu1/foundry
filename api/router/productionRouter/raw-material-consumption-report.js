/* import module */
const mongoose = require('mongoose');
const express = require('express');
const router = express();

/* controller */
const RawMaterialConsumptionController = require('../../controller/production/raw-material-consumption-report');

/*  get Raw Material Consumption Report */
router.get('/',RawMaterialConsumptionController.get_raw_material_report); 

/* pdf format getting report*/
router.get('/rawMaterialPdf',RawMaterialConsumptionController.get_raw_material_report_all_ptf);

/* excel format getting report*/
router.get('/rawMaterialXlsx',RawMaterialConsumptionController.get_raw_material_report_all_xlsx);

/* get Raw Material Consumption Report customized */
router.post('/',RawMaterialConsumptionController.raw_material_consumption_report_combination);

module.exports = router;