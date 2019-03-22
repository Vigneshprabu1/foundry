/*Importing Module */
const mongoose= require('mongoose');

 /*Creation Of Lpg Master Schema */
const lpgMasterSchema= new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    boughtDate: String,
    replaceDate: String,
    totalCost:Number,
    noOfHours:Number,
    perHourCost:Number,
    createdBy:String,
    createdOn:String,
    modifiedBy:String,
    modifiedOn:String
});

/* Exporting Lpg Master Schema For Future Use */
module.exports = mongoose.model('LpgMaster',lpgMasterSchema);