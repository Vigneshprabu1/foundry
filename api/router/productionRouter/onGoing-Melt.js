
/* import module */
const express=require('express');
const router=express();

/* controller */
const ongoingmeltController=require('../../controller/production/onGoing-Melt');

/* schedule the melt */
router.get('/schedule',ongoingmeltController.schedule_melt);

//router.get('/partCost',ongoingmeltController.get_part_of_cost);

/* getting all onging melt details */
router.get('/',ongoingmeltController.get_ongoing_melt_all);

/* fetching the data based on customer name */
router.post('/',ongoingmeltController.get_ongoing_melt_customerName);

/*Update Currrent ongoing melt with batchId */
router.patch('/',ongoingmeltController.update_ongoing_melt);

/* change the status as 1 while we know that ongoing process will be completed so it will be converted as completed melt */
router.patch('/statusUpdate/:batchId',ongoingmeltController.ongoing_melt_status_change);

/* get ongoing melt using MeltId */
router.get('/:meltId',ongoingmeltController.get_ongoing_melt);

/* get partId by customer Name */
router.get('/batch/:batchId',ongoingmeltController.get_ongoing_melt_batchId);

/* get partId by customer Name */
router.get('/get/:customerName',ongoingmeltController.get_partId_by_customer_name);

/* get ongoing melt details */
router.post('/meltReport/',ongoingmeltController.get_ongoing_melt_by_melt_report);

module.exports=router;