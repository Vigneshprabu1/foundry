const mongoose=require('mongoose');

const mailSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    emailId:String,
    password:String,
    subject:String,
    message:String,
    companyName:String,
    createdOn:String,
    createdBy:String,
    modifiedOn:String,
    modifiedBy:String,
    status:String
});

module.exports=mongoose.model('Mail',mailSchema);