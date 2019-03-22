

/* module */
const mongoose = require('mongoose');

/* Creation of Completed Melt Schema */
const completedMeltSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    meltNo: String,
    orderId: String,
    orderDate: String,
    batchId: String,
    customerName: String,
    partId: String,
    moldType: String,
    partWeight: Number,
    quantity: Number,
    returnWeight: Number,
    rejectionWeight: Number,
    deliveryDate: Date,
    deliveredQuantity:Number,
    createdOn: String,
    createdBy: String,
    modifiedOn: String,
    modifiedBy: String,
    status: String,
});


/*  Exporting the completed melt schema for further use*/
module.exports = mongoose.model('CompletedMelt', completedMeltSchema);