/* import module */
const mongoose=require('mongoose');

/* creating the return and rejection schema*/
const returnAndRejectionSchema=new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    itemName : String,
    weight: Number,    
    balanceQty:Number,
    createdOn:String,
    createdBy:String,
    modifiedOn:String,
    modifiedBy:String,
});

/* exporting the schema for further use*/
module.exports = mongoose.model('ReturnAndRejection',returnAndRejectionSchema);