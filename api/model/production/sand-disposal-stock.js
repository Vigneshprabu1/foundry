/* import module*/
const mongoose= require('mongoose');

/* creating the sand disposal schema*/
const sandDisposalStockSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    itemName: String,
    quantity: Number,
    createdOn:String,
    createdBy:String,
    modifiedOn:String,
    modifiedBy:String,
});

/* exporting the schema for further use*/
module.exports = mongoose.model('SandDisposalStock',sandDisposalStockSchema);