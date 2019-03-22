/* imported module*/
const mongoose=require('mongoose');

/* creating the core Details schema */
const coreDetailsSchema=new mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    coreType:String,
    coreWeight:Number,
    batchId:String,
    createdOn:String,
    createdBy:String,
    modifiedOn:String,
    modifiedBy:String
     
});


/* exporting the core details schema */
module.exports=mongoose.model('CoreDeatils',coreDetailsSchema);