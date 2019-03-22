/* import module */
const mongoose = require('mongoose');

/* creating the rawmaterial predata schema*/
const rawMaterialPreDataSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    itemName: String,
    itemType: String,
    itemPercentage: Number,
    itemCategory:String,
    moldType: String,
    createdOn: String,
    createdBy: String,
    modifiedOn: String,
    modifiedBy: String,
    status: String
});

/* exporting the schema for further use*/
module.exports = mongoose.model('RawMaterialPreData', rawMaterialPreDataSchema);