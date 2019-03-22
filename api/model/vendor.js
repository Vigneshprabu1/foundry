const mongoose = require('mongoose');
const autoIncrement=require('mongoose-auto-increment')

const vendorSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    vendorName: String,
    vendorType: String,
    mobile: { type : String , unique : true, required : true, dropDups: true },
    email: { type : String , unique : true, required : true, dropDups: true },
    address: String,
    vendorCode:{type:Number,default:1,unique:true},
    preferredType: String,
    createdOn: String,
    createdBy: String,
    modifiedOn: String,
    modifiedBy: String,
    status: String
});

autoIncrement.initialize(mongoose);
vendorSchema.plugin(autoIncrement.plugin,{
    model:'Vendor',
    field:'vendorCode',
    startAt: 1,
    incrementBy: 1
})

module.exports = mongoose.model('Vendor', vendorSchema)


