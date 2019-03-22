/* import module */
const mongoose =  require('mongoose');

/*creating the rawmaterial summary report schema */
const rawMaterialSummaryReportSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    meltDate:String,
    meltNo:String,
    itemName:String,
    weight:Number,
    date:Number,                               
    month:Number,
    year:Number,
    mon:String,
    createdOn:String,
    createdBy:String,
    modifiedOn:String,
    modifiedBy:String
})

/* exporting the schema for further use*/
module.exports = mongoose.model('RawMaterialSummaryReport',rawMaterialSummaryReportSchema);