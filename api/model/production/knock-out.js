/* import mongoose  module*/
const mongoose=require('mongoose');

/* creating the knock-out schema */
const knockOutSchema=new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    meltNo:String,
    batchId: String,
    partId: String,
    startTime:String,
    endTime:String,
    roughCastingWeight:Number,
    pouringWeight:Number,
    totalWorkingHours:Number,
    otHours:Number,
    quantity:Number,
    createdOn:String,
    createdBy:String,
    modifiedOn:String,
    modifiedBy:String,
});

/* exporting the schema for further use*/
module.exports=mongoose.model('KnockOut',knockOutSchema);