/* model */
const mongoose=require('mongoose');

/*Creating a Schema as a melting Model*/
const meltingSchema=new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    meltNo:String,   
    startTime:String,
    endTime:String,
    peakTemp:Number,
    endTemp:Number,
    labourCost:Number,
    perCost:Number,
    typeOfCost:String,
    electricityKwh:Number,
    totalWorkingHours:Number,
    otHours:Number,
    consumableCost:Number,
    perLabourCost:Number,
    createdOn:String,
    createdBy:String,
    modifiedOn:String,
    modifiedBy:String,

});

/* exporting the schema for further use*/
module.exports=mongoose.model('Melting',meltingSchema);
