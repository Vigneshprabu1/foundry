/* import module */
const mongoose = require('mongoose');

/*  creating the company master schema */
const companyMasterSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    companyName: String,
    emailId: String,
    phoneNo: String,
    address: String,
    startDate: String,
    endDate: String,
    companyCode: String,
    idProof: String,
    createdOn: String,
    createdBy: String,
    modifiedOn: String,
    modifiedBy: String,
    status:String
});

/* exporting the schema for further use*/
module.exports = mongoose.model('CompanyMaster', companyMasterSchema);