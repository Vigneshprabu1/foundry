/* import module */
const mongoose= require('mongoose');

/* creating the temp schedule melt schema*/
const tempSchMeltSchema=new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    scheduledId:String,
    createdBy:String,
    createdOn:String,
});

/* exporting the schema for further use*/
module.exports=mongoose.model('TempScheduledMelt',tempSchMeltSchema);







