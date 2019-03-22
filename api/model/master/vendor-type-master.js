/* Importing mongoose module */
const mongoose = require("mongoose");

/* Creation of Schema*/
const vendorTypeMasterSchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  vendorType: { type: String, unique: true, required: true, dropDubs: true },
  status: String,
  createdOn: String,
  createdBy: String,
  modifiedOn: String,
  modifiedBy: String
});

/* Exporting Schema For Future Use */
module.exports = mongoose.model("VendorTypeMaster", vendorTypeMasterSchema);
