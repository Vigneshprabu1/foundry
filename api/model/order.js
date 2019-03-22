const mongoose=require('mongoose');
const autoIncrement=require('mongoose-auto-increment');

const orderSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    orderId: { type: Number,default:1,unique:true},
    orderDate: String,
    customer:{type:mongoose.Schema.Types.ObjectId, ref: 'Customer'},
    product:{type:mongoose.Schema.Types.ObjectId, ref: 'Product'},
    quantity:String,
    paintingType: String,
    deliveryDate:String,
    createdOn: String,
    createdBy: String,
    modifiedOn: String,
    modifiedBy: String,
    status: String,
});
autoIncrement.initialize(mongoose);
orderSchema.plugin(autoIncrement.plugin,{
    model:'Order',
    field:'orderId',
    startAt: 1,
    incrementBy: 1
})
module.exports=mongoose.model('Order',orderSchema)