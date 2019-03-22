/* Import Mongoose Module */
const mongoose = require("mongoose");

/* creation of Item Type Master Schema */
const moldingMasterSchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  moldType: { type: String, unique: true, required: true, dropDubs: true },
  status: String,
  createdOn: String,
  createdBy: String,
  modifiedOn: String,
  modifiedBy: String
});

/* Exporting Item Type Master For Future use */
module.exports = mongoose.model("MoldingMaster", moldingMasterSchema);
