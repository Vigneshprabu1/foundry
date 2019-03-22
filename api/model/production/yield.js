/* import module */
const mongoose=require('mongoose');

/* creating the yield schema*/
const yieldSchema=new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    meltNo:String,
    batchId:Number,
    partId:String,
    pouringWeight:Number,
    roughCastingWeight:Number,
    meltWeight:Number,
    yieldWeight:Number,
    yieldPercentage:Number,
    returnWeight:Number,
    roughCastingTotalWeight:Number,
    quantity:Number,
    createdOn:String,
    createdBy:String,
    modifiedOn:String,
    modifiedBy:String,
});

/* exporting the schema for further use*/
module.exports=mongoose.model('Yield',yieldSchema);