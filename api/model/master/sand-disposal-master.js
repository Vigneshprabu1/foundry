/* Import Mongoose Module */
const mongoose = require('mongoose');

/* creation of sandDisposalMasterSchema */
const sandDisposalMasterSchema = new mongoose.Schema({
    _id:mongoose.Types.ObjectId,
   itemName:String,
   disposalPercentage:Number,
   moldType:String,
    status:String,
    createdOn:String,
    createdBy:String,
    modifiedOn:String,
    modifiedBy:String
});

/* Exporting Sand Disposal Master For Future use */
module.exports = mongoose.model('SandDisposalMaster',sandDisposalMasterSchema);



