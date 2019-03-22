const mongoose = require('mongoose');

const fettlingMasterSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    machineId: String,
    machineName: String,
    itemType:String,
    consumableName: String,
    totalCapacity: Number,
    perKgCost: Number,
    replacementRate: String,
    replacementQuantity:Number,
    partName: String,
    partCost:Number,
    createdOn: String,
    createdBy: String,
    modifiedOn: String,
    modifiedBy: String,
    status: String
});

module.exports = mongoose.model('FettlingMaster', fettlingMasterSchema);
