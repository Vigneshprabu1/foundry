const express = require('express');

const router = express.Router();

const DeliverCompleted=require('../controller/DeliveryCompleted');

router.get('/',DeliverCompleted.get_Delivery_all_report);
router.post('/',DeliverCompleted.get_filter_report);
router.get('/deliveryXlsx',DeliverCompleted.get_Delivery_report_all_xlsx);
router.get('/deliveryPdf',DeliverCompleted.get_Delivery_report_all_ptf);
module.exports=router;