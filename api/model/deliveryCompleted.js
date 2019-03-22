const mongoose=require('mongoose');

const deliveryCOmpletedSchemas=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    customerName:String,
    orderId: Number,
    orderDate: Date,
    deliveryDate: Date,
    meltNo: String,
    batchId: Number,
    partId: Number,
    partWeight: Number,
    quanty: Number,
    totalWeight: Number,
    yieldPercentage: Number,
    rejectionWeight: Number,
    returnWeight: Number,
    createdOn:String,
    createdBy:String,
    modifiedOn:String,
    modifiedBy:String,
    status:String    
});

module.exports=mongoose.model('DeliveryCompleted',deliveryCOmpletedSchemas)