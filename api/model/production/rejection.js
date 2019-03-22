/* import module */
const mongoose = require('mongoose');

/* creating the rejection schema*/
const rejectionSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    customerName: String,
    partId:String,
    meltNo:String,
    batchId:String,
    quantity:Number,
    partWeight:Number,
    totalWeight:Number,
    rejectionPercentage:Number,
    reasonForRej:String,
    createdOn:String,
    createdBy:String
})

/* exporting the schema for further use*/
module.exports= mongoose.model('Rejection',rejectionSchema);