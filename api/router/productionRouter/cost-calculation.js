/* Modules */
const mongoose=require('mongoose');
const express=require('express');
const router=express();

/* Controller */
const costCalculationController=require('../../controller/production/cost-calculation');


/* over all cost calculation  */
router.get('/overallcost/:meltNo',costCalculationController.over_all_cost_calculation);

/*cost calculation entry */
router.get('/cost/:orderId/:batchId',costCalculationController.cost_calculation_save);


module.exports=router;