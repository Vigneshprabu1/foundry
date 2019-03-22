/* import module */
const mongoose=require('mongoose');

/* creating the schedule melt schema*/
const scheduleMeltSchema=new mongoose.Schema({
     _id:mongoose.Schema.Types.ObjectId,
     order: {type:mongoose.Schema.Types.ObjectId, ref: 'Order'},
     orderId:{type:String},
     customerName:{type:String},
     partId: {type :String},
     meltWeight:{type:Number},
     moldType : {type:String},
     coreWeight: {type:Number},
     quantity:{type:Number},
     partWeight:{type:Number},
     totalWeight:{type:Number},
     deliveryDate:{type:String},
     orderDate:{type:String},
     paintingType: String,
     createdOn:String,
     createdBy:String,
     modifiedOn:String,
     modifiedBy:String,
     status:{type:String,default:'null'},
});

/* exporting the schema for further use*/
module.exports=mongoose.model('ScheduleMelt',scheduleMeltSchema);