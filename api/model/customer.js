const mongoose=require('mongoose');


const customerSchema = mongoose.Schema({
    customerId: mongoose.Types.ObjectId,
    customerName: String,
    mobileNo: String,
    emailId:String  ,
    address: String,
    createdOn: String,
    createdBy: String,
    modifiedOn: String,
    modifiedBy: String,
    status: String,
});

module.exports=mongoose.model('Customer',customerSchema)