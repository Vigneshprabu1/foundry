var express = require('express');
var router = express.Router();

const purchaseController=require('../controller/purchase')

router.get('/invoiceNo',purchaseController.purchase_empty_invoice);
router.get('/:purchaseId',purchaseController.purchase_get_one);
router.post('/',purchaseController.purchase_save);
router.post('/search',purchaseController.purchase_search_for_edit);
router.put('/',purchaseController.purchase_update)
router.get('/',purchaseController.purchase_get_all);

module.exports = router;