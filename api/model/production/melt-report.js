/* import module */
const mongoose = require('mongoose');

/* creating the meltReport Schema*/
const MeltReportSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    orderDate:  String ,
    orderId: Number,
    customerName:   String ,
    deliveryDate:  String ,
    meltDate: String ,
    meltNo:  String ,
    batchId:  String ,
    partId:  String ,
    moldType:  String ,
    quantity: Number ,
    partWeight:  Number ,
    mouldWeight: Number ,
    roughCastingWeight:  Number ,
    noOfMould:  Number ,
    totalWeight: Number ,
    yieldPercentage: Number ,
    returnWeight:  Number ,
    rejectionWeight: Number ,
    rejectionPercentage: String,
    status: String ,
    createdOn: String,
    createdBy: String,
    modifiedOn: String,
    modifiedBy: String,
})
/* exporting the schema for further use*/
module.exports = mongoose.model('MeltReport', MeltReportSchema);