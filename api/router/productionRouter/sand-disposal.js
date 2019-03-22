/* import module */
const mongoose=require('mongoose');
const express=require('express');
const router=express();

/* controller */
const sandDisposalController=require('../../controller/production/sand-disposal');


/* getting all sand dispatching data*/
router.get('/getInvoice/All',sandDisposalController.get_all_sand_dispatching_invoice);
/* Get InvoiceNo */
router.get('/invoiceNo/get',sandDisposalController.get_sand_dispatching_invoiceNo);
/* getting all data from database */
router.get('/',sandDisposalController.get_sand_disposal_details);

/*Get Sand Disposal Stock*/
router.get('/stock',sandDisposalController.get_sand_disposal_stock);

/*Save Sand Dispatching Stock*/
router.post('/dispatch',sandDisposalController.way_slip_entry_save);

/* getting sand disposal data using batchId*/
router.get('/batchId/:batchId',sandDisposalController.sand_disposal_get_using_batchId);

/* getting sand disposal data using batchId*/
router.post('/batchId/:batchId',sandDisposalController.sand_disposal_save_using_batchId);

/* getting sand disposal data using meltNo*/
//router.get('/:meltNo',sandDisposalController.sand_disposal_get_using_meltNo);

/* update the sand disposal */
router.put('/',sandDisposalController.sand_disposal_update);



/* update the waySlip and sand dispatching*/
router.patch('/dispatch',sandDisposalController.way_slip_entry_update);

/* delete the way slip entry*/
router.put('/delete',sandDisposalController.way_slip_delete);



/* getting particular sand dispatching details using disposalInvoice no */
router.get('/:disposalInvoiceNo',sandDisposalController.get_sand_dispatching_invoice_using_disposalNo);

/* finding the last inserted record*/
router.get('/dispatch/lastEntry',sandDisposalController.get_last_record);
module.exports=router;