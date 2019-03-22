/* imported module*/
const mongoose=require('mongoose');

/* creating  a core making master schema */
const coreMakingMasterSchema=new mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    coreType:String,
    moldType:String,
    status:String,
    createdOn:String,
    createdBy:String,
    modifiedOn:String,
    modifiedBy:String,
});

/* exporting the core making master schema*/
module.exports=mongoose.model('CoreMakingMaster',coreMakingMasterSchema);