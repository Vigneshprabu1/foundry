const mongoose = require('mongoose');

const tempStockSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    itemName: String,
    itemType: String,
    weight: Number,
    unit:String,
    minWeightReq:Number,
    totalAmount: Number,
    vendorName: String,
    invoiceNo: Number,
    orderDate: String,
    orderTime:String,
    deliveryDate: String,
    deliveryTime: String,
    deliveredTime: String,
    purchaseId:String,
    

});
module.exports = mongoose.model('TempStock', tempStockSchema);

