/* Module*/
const mongoose = require('mongoose');
/* Creating Schema*/
const sandDispatchingSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    disposalInvoiceNo: String,
    vendorName:String,
    invoiceNo:String,
    invoiceDate: String,
    waySlipNumber:String,
    waySlipEntry:{type:mongoose.Schema.Types.ObjectId,ref:'WaySlipEntry'},
    totalCost: Number,
    day:Number,                               
    month:Number,
    year:Number,
    createdOn: String,
    createdBy: String,
    modifiedOn: String,
    modifiedBy: String,
});
/* Exporting the schema to use in other controllers */
module.exports = mongoose.model('SandDispatching', sandDispatchingSchema);