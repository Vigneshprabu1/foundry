
/* import module */
const mongoose=require('mongoose');

/* creation of fettling schema*/
const fettlingSchema=new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    meltNo:String,
    batchId:String,
    partId:String,
    startTime:String,
    endTime:String,
    machineId:String,
    consumable:{},
    totalWorkingHours:Number,
    otHours:Number,
    totalCost:Number,
    perCost:Number,
    labourCost:Number,
    consumableCost:Number,
    quantity:Number,
    moldType:String,
    createdOn:String,
    createdBy:String,
    modifiedOn:String,
    modifiedBy:String,
});

/* exporting the fettling schema */
module.exports=mongoose.model('Fettling',fettlingSchema);