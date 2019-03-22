/* Import Mongoose Module */
const mongoose = require("mongoose");

/* creation of Item Type Master Schema */
const itemTypeMasterSchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  itemType: { type: String, unique: true, required: true, dropDubs: true },
  stockType:{ type: String},
  status: String,
  createdOn: String,
  createdBy: String,
  modifiedOn: String,
  modifiedBy: String
});

/* Exporting Item Type Master For Future use */
module.exports = mongoose.model("ItemTypeMaster", itemTypeMasterSchema);
 