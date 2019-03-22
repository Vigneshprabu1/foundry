/* import module */
const mongoose = require('mongoose');

/*  creating the painting master schema */
const departmentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    activity: String,
    department: String,
    status: String,
    createdOn:String,
    createdBy:String,
    modifiedOn:String,
    modifiedBy:String
});

/* exporting the schema for further use*/
module.exports = mongoose.model('Department', departmentSchema);