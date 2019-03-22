/** imported module  */
const mongoose=require('mongoose');

/* creating the schema */
const waySlipEntry=new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    waySlipDate:String,
    waySlipNumber:String,
    itemName:String,
    itemWeight:Number,
    disposalWeight:Number,
    unit:String,
    cost:Number,
    day:Number ,
    month:Number ,
    year:Number,
    createdOn: String,
    createdBy: String,
    modifiedOn: String,
    modifiedBy: String

});

/* export the schema for further usage */
module.exports=mongoose.model('WaySlipEntry',waySlipEntry);