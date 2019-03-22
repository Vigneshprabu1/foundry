
/* import module */
const mongoose= require('mongoose');

/*  creating the labour schema */
const labourMasterSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    activityName:String,
    labourEmpType:String,
    workingType:String,
    ratePerKg:Number,
    ratePerHour:Number,
    otHours:Number,
    employeeId:String,
    employeeName:String,
    paintingType:String,
     machineId:String,
     status:String,
    createdOn:String,
    createdBy:String,
    modifiedBy:String,
    modifiedOn:String,
});

/* exporting the schema for further use*/
module.exports = mongoose.model('LabourMaster',labourMasterSchema);