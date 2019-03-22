/* import module */
const mongoose=require('mongoose');

/* creating the RawMaterialConsumptionReportSchema */
const rawMaterialConsumptionReportSchema=new mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    partId:String,
    meltNo:String,
    batchId:String,
    rawMaterialTotalWeight:Number,
    consumablesTotalWeight:Number,
    itemName:String,
    itemType:String,
    totalCostRawMaterial:Number,
    totalCostConsumables:Number,
    orderId:Number,
    meltDate:String,
    quantity:Number,
    createdOn:String,
    createdBy:String,
    modifiedOn:String,
    modifiedBy:String
});

/* exporting the schema for further use*/
module.exports=mongoose.model('RawMaterialConsumptionReport',rawMaterialConsumptionReportSchema);