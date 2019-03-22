/* import module*/
const mongoose=require('mongoose');
const autoIncrement=require('mongoose-auto-increment');

/* creating the ongoing melt schema*/
const ongoingMeltSchema=new mongoose.Schema({
    _id:mongoose.Types.ObjectId,   
    batchId:{type:Number,default:1,unique:true},   
    meltId:{type:mongoose.Schema.Types.ObjectId,ref:'Melt',unique:false},
    orderId:Number,
    orderDate:String,
    deliveryDate:String,
    customerName:String,
    productName:String,     
    partId:String,
    moldType:String,
    partType:String,    
    quantity:Number, 
    meltWeight:Number, 
    paintingType: String,
    scheduleMeltQuantity:Number,
    rawmaterialconsumption:{type:mongoose.Schema.Types.ObjectId,ref:'RawMaterial'},
    coremaking:{type:mongoose.Schema.Types.ObjectId,ref:'CoreMaking'},
    moulding:{type:mongoose.Schema.Types.ObjectId,ref:'Moulding'},
    melting:{type:mongoose.Schema.Types.ObjectId,ref:'Melting'},
   // pouring:{type:mongoose.Schema.Types.ObjectId,ref:'Pouring'},
    knockout:{type:mongoose.Schema.Types.ObjectId,ref:'KnockOut'},
    shotblasting:{type:mongoose.Schema.Types.ObjectId,ref:'ShotBlasting'},
    fettling:{type:mongoose.Schema.Types.ObjectId,ref:'Fettling'},
    painting:{type:mongoose.Schema.Types.ObjectId,ref:'Painting'},
    sanddisposal:{type:mongoose.Schema.Types.ObjectId,ref:'SandDisposal'},
    yield:{type:mongoose.Schema.Types.ObjectId,ref:'Yield'},
    createdOn:String,
    createdBy:String,
    modifiedOn:String,
    modifiedBy:String,
    currentStatus:String,
    status:{type:String,default:'null'}

});
autoIncrement.initialize(mongoose);

/* batchId auto increment plungin function */
ongoingMeltSchema.plugin(autoIncrement.plugin,{
    model:'OnGoingMelt',
    field:'batchId',
    startAt: 1,
    incrementBy: 1
   
});

/* exporting the schema for further use*/
module.exports=mongoose.model('OnGoingMelt',ongoingMeltSchema);  