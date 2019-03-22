/* import module */
const mongoose=require('mongoose');

/* creating the unSchedule melt schema */
const unscheduledMeltSchema=new mongoose.Schema({
     _id:mongoose.Schema.Types.ObjectId,
     order: {type:mongoose.Schema.Types.ObjectId, ref: 'Order'},
     orderId:String,
     customerName:String,
     partId: String,
     meltWeight:Number,
     moldType : String,
     coreWeight:Number,
     quantity:Number,
     partWeight:Number,
     totalWeight:Number,
     deliveryDate:String,
     paintingType: String,
     orderDate:String,
     createdOn:String,
     createdBy:String,
     modifiedOn:String,
     modifiedBy:String,
     status:{type:String,default:'null'},
});

/* exporting the schema for further use*/
module.exports=mongoose.model('UnscheduledMelt',unscheduledMeltSchema);