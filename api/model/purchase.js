const mongoose = require('mongoose');
const autoIncrement=require('mongoose-auto-increment');

const purchseSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    invoiceNo: {type:Number},
    invoiceDate: String,
    weight: Number,
    transportCost: Number,
    gstValue:Number,
    stockType:String,
    totalAmount: Number,
    deliveryTime: String,
    deliveryDate: String,
    orderDate:String,
    orderTime:String,
    createdOn:String,
    createdBy:String,
    modifiedOn:String,
    modifiedBy:String,
    status:String,    
    stockNo:{type:String},
    items: {type:mongoose.Schema.Types.ObjectId, ref:'Items'},      
    vendor: {type:mongoose.Schema.Types.ObjectId, ref:'Vendor' }
});

module.exports = mongoose.model('Purchase', purchseSchema);