const mongoose=require('mongoose');

const pouringSchema=new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    meltNo:String,   
    startTime:String,
    endTime:String,
    pouringWeight:Number,
    pouringTemp:Number,
    noOfLabours:Number,
    createdOn:String,
    createdBy:String,
    modifiedOn:String,
    modifiedBy:String,
});

module.exports=mongoose.model('Pouring',pouringSchema);