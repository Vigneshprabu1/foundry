/* import module */
const mongoose = require('mongoose');

/*  creating the painting master schema */
const salarySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    salaryType: String,
    workingDays: Number,
    status: String,
    createdOn:String,
    createdBy:String,
    modifiedOn:String,
    modifiedBy:String
});

/* exporting the schema for further use*/
module.exports = mongoose.model('Salary', salarySchema);