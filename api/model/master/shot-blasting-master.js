/* import module */
const mongoose = require('mongoose');

/* creating the shot blasting master schema*/
const shotBlastingMasterSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    machineId: String,
    machineName: String,
    itemType:String,
    consumableName: String,
    totalCapacity: Number,
    perKgCost: Number,
    replacementRate: String,
    replacementQuantity:Number,
    //machineStatus: String,
    partName: String,
    partCost:Number,
    createdOn: String,
    createdBy: String,
    modifiedOn: String,
    modifiedBy: String,
    status: String
});
/* exporting the schema for further use*/
module.exports = mongoose.model('ShotBlastingMaster', shotBlastingMasterSchema);
