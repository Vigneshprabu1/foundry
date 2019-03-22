const mongoose=require('mongoose');


const itemsSchemas=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    itemName: { type : String , unique : true, required : true, dropDups: true },
    itemType:String,
    unit:String,
    gst:Number,
    itemCategory:String,
    stockType:String,
    minWeightReq:Number,
    perQtyWeight:Number,
    createdOn:String,
    createdBy:String,
    modifiedOn:String,
    modifiedBy:String,
    status:String    
});

module.exports=mongoose.model('Items',itemsSchemas)        