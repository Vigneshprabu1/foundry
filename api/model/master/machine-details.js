/* import module */
const mongoose = require('mongoose');

/*  creating the activity master schema */
const machineDetailsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    activityType: String,
    machineId:String,
    machineName:String,
    paintingType: String,
    machineStatus:String,
    createdOn: String,
    createdBy: String,
    modifiedOn: String,
    modifiedBy: String,
    status:String
});

/* exporting the schema for further use*/
module.exports = mongoose.model('MachineDetails', machineDetailsSchema);