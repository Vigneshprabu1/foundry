/* import module */
const mongoose = require('mongoose');

/*  creating the painting master schema */
const paintingMasterSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    paintingType:String,
    paintName: String,
    perLitreCost: Number,
    moldType: String,
    createdOn:String,
    createdBy:String,
    modifiedOn:String,
    modifiedBy:String,
    status: String
});

/* exporting the schema for further use*/
module.exports = mongoose.model('PaintingMaster', paintingMasterSchema);