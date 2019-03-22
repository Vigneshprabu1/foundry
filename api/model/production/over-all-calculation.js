
/*
import module
*/
const mongoose=require('mongoose');

const overAllCostCalculationSchema=new mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    orderId:String,
    customerName:String,
    batchId:String,
    partId:String,
    meltNo:String,
    heatCode:String,
    RawMaterialCost:Number,
    coreMakingCost:Number,
    mouldingCost:Number,
    meltingCost:Number,
    knockOutCost:Number,
    shotBlastingCost:Number,
    fettlingCost:Number,
    paintingCost:Number,
    quantity:Number,
    totalMeltWeight:Number,
    totalCost:Number

});


module.exports=mongoose.model('OverAllCostCalculation',overAllCostCalculationSchema);

