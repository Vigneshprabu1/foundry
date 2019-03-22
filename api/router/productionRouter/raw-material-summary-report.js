/* import module */
const mongoose = require('mongoose');
const express = require('express');
const router = express();

/* controller */
const RawMaterialSummaryController = require('../../controller/production/raw-material-summary-report');

/* Get  all RawMaterial Summary Report */
router.get('/',RawMaterialSummaryController.raw_material_summary_report_all);

/* filtering data in rawmaterial summary report*/
router.post('/',RawMaterialSummaryController.raw_material_summary_report);

/* Get All Years */
router.get('/getYears',RawMaterialSummaryController.get_year);

module.exports = router;