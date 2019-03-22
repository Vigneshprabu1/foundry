const express=require('express');
const router=express.Router();
const purchaseReportController=require('../controller/purchase-report');

router.get('/purchasePdf',purchaseReportController.get_purchase_report_all_ptf);
router.get('/purchaseXlsx',purchaseReportController.get_purchase_report_all_xlsx);
router.get('/:allReport',purchaseReportController.get_purchase_all);
router.post('/',purchaseReportController.get_purchase_report);
router.put('/',purchaseReportController.get_purchase_vendorWise_report);
router.get('/',purchaseReportController.get_purchase_years);


module.exports=router;