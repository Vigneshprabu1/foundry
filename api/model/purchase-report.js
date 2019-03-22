const monggose = require('mongoose');

const purchaseReportScheme = monggose.Schema({
    _id: monggose.Schema.Types.ObjectId,
    invoiceNo: Number,
    invoiceDate: String,
    weight: Number,
    unit:String,
    totalAmount: Number,
    gstValue:Number,
    deliveryTime: String,
    deliveryDate: String,
    orderDate: String,
    stockNo: String,
    itemName: String,
    itemType: String,
    vendorName: String,
    vendorType: String,
    stockType:String,
    date:String,
    month:String,
    monthly:String,
    year:String
});
module.exports = monggose.model('PurchaseReport', purchaseReportScheme);