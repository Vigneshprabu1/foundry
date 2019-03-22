
const mongoose = require("mongoose");

const itemCategorySchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  itemCategory: { type: String, unique: true, required: true, dropDubs: true },
  status: String,
  createdOn: String,
  createdBy: String,
  modifiedOn: String,
  modifiedBy: String
});

module.exports = mongoose.model("itemCategoryMaster", itemCategorySchema);
