/* import module */
const mongoose= require('mongoose');
const express = require('express');
const router= express();
 
/* controller */
const MeltReportController = require('../../controller/production/melt-report');

/* getting  all melt Report Details */
router.get('/',MeltReportController.get_all_melt_report);

/* get selected melt report */
router.post('/selectedReports',MeltReportController.get_selected_report);

/* get meltNo report */
router.get('/:meltNo',MeltReportController.get_melt_report_using_meltNo);

/* pdf format report*/
router.get('/meltReportPdf',MeltReportController.get_melt_report_all_ptf);

/* getting excel format report */
router.get('/meltReportXlsx',MeltReportController.get_melt_report_all_xlsx);

module.exports = router;