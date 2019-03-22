/* import module */
const mongoose=require('mongoose');


/* Creation Of Schema */
const paintingSchema=new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    meltNo:String,
    batchId: String,
    partId: String,
    startTime:String,
    endTime:String,
    totalWorkingHours:Number, 
    otHours:Number,
    quantity:Number,
    totalPaint:Number,
    labourCost:Number,
    consumableCost:Number,
    perCost:Number,
    paintingType:String, 
    paintingName:String,   
    createdOn:String,
    createdBy:String,
    modifiedOn:String,
    modifiedBy:String,
});

/* Exporting the schema for further use */
module.exports=mongoose.model('Painting',paintingSchema);