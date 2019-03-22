/* Module*/
const mongoose = require('mongoose');
/* Creating Schema*/
const sandDisposalSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    meltNo: String,
    batchId: String,
    itemName: String,
    mouldWeight:Number,
    weightDisposed: Number,
    totalWeight: Number,
    disposalPercentage: Number,
    createdOn: String,
    createdBy: String,
    modifiedOn: String,
    modifiedBy: String,
});
/* Exporting the schema to use in other controllers */
module.exports = mongoose.model('SandDisposal', sandDisposalSchema);