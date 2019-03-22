/* imported module*/
const mongoose=require('mongoose');

/* creating the core making schema */
const coreMakingSchema=new mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    partId:String,
    moldType:String,
   coreDetails:[],
    totalWeight:Number,
    startTime:String,
    endTime:String,
    totalWorkingHours:Number,
    otHours:Number,
    meltNo:String,
    batchId:String,
    labourCost:Number,
    consumableCost:Number,
    totalCost:Number,
    perCost:Number,
    createdOn:String,
    createdBy:String,
    modifiedOn:String,
    modifiedBy:String
     
});


/* exporting the fettling schema */
module.exports=mongoose.model('CoreMaking',coreMakingSchema);