/* import module */
const mongoose=require('mongoose');

/* creating the costcalculation schema */
const costCalculationSchema=new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
   customerName:String,
   orderId:String,
   partId:String,
   quantity:Number,
   perKgCost:Number,
   totalCost:Number,
   meltNo:String,
   heatCode:String,
   individualPartWeight:Number,
   totalWeight:Number,
   status:String,
   invoiceNo:String


})

/* exporting the schema for further use*/
module.exports=mongoose.model('CostCalculation',costCalculationSchema);