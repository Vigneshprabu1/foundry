const mongoose=require('mongoose');

const mcConsumableStockSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    itemName:String,
    itemType:String,
    weight:Number,
    unit:String,
    perKG:Number,
    totalAmount:Number,
    averageWeight:Number,
    minWeightReq:Number,
    minOrderWeight:Number,
    maxOrderWeight:Number,
    lastOrder:String,
    deliveredTime:String,
    purchaseId:String
});

module.exports=mongoose.model('McConsumableStock',mcConsumableStockSchema);