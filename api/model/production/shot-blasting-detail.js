/* import module */
const mongoose=require('mongoose');

/* creating the shotblasting schema*/
const shotBlastingSchema=new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    meltNo:String,
    partId:String,
    batchId:Number,
    startTime:String,
    endTime:String,
    machineId:String,
    totalWorkingHours:Number,
    otHours:Number,
    consumable:{},
   // shotsUsedInWeight:Number,
    totalCost:Number,
    perCost:Number,
    typeOfCost:String,
    labourCost:Number,
    consumableCost:Number,
    quantity:Number,
    moldType:String,
    createdOn:String,
    createdBy:String,
    modifiedOn:String,
    modifiedBy:String,
});

/* exporting the schema for further use*/
module.exports=mongoose.model('ShotBlasting',shotBlastingSchema);

