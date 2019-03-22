/* import module */
const mongoose=require('mongoose');
const autoIncrement=require('mongoose-auto-increment');

/* creating the meltSchema */
const MeltSchema= new mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    heatCode:{type:String},
    meltNo:{type:Number,default:1,unique:true},
    meltStartDate:{type:String},
    meltEndDate:{type:String},
    totalMeltWeight:{type:Number},
    moldingType:{type:String},
    meltStatus:{type:String,default:'null'},
    batchStatus:{type:String,default:'null'},
    createdOn:String,
    createdBy:String,
    modifiedOn:String,
    modifiedBy:String,
}) 

autoIncrement.initialize(mongoose);
/* meltno auto increment plungin function */
MeltSchema.plugin(autoIncrement.plugin,{
    model:'Melt',
    field:'meltNo',
    startAt: 1,
    incrementBy: 1
   
});

/* exporting the schema for further use*/
module.exports=mongoose.model('Melt',MeltSchema);