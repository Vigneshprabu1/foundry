const mongoose=require('mongoose');

const userScheme=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    userName:String,
    password:String,
    emailId: { type : String , unique : true, required : true, dropDups: true },
    mobile: { type : String , unique : true, required : true, dropDups: true },
    address:String,
    role:String,
    roleStatus:String,
    createdOn:String,
    createdBy:String,
    modifiedOn:String,
    modifiedBy:String,
    status:String
});

module.exports=mongoose.model('User',userScheme);