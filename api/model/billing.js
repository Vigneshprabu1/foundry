const mongoose=require('mongoose');


const billingSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    customerName: String,
    orderId: Number,
    partId: String,
    deliveryQuantity: Number,
    perKGCost: Number,
    totalCost: Number,
    partWeight: Number,
    totalWeight: Number,
    headCode: String,
    invoiceNo: Number,
    createdBy: String,
    modifiedOn: String,
    modifiedBy: String,
    status: String,
});

module.exports=mongoose.model('Billing',billingSchema)