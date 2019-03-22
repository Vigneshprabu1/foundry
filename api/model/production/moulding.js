/* import module*/
const mongoose=require('mongoose');

/* creating the moulding schema */
const mouldingSchema=new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    meltNo:String,
    batchId:Number,  
    noOfPieces:Number,
    moldType:String,
    partId:String,
    startDate:String,
    endDate:String,
    topWeight:Number,
    bottomWeight:Number,
    weight:Number,   
    totalWorkingHours:Number,
    otHours:Number,
    labourCost:Number,
    perCost:Number,
    typeOfCost:String,
    createdOn:String,
    createdBy:String,
    modifiedOn:String,
    modifiedBy:String,

});

/* exporting the schema for further use*/
module.exports=mongoose.model('Moulding',mouldingSchema);
