/* Import Mongoose Module */
const mongoose = require("mongoose");

/* creation of Role Master Schema */
const roleMasterSchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  role: { type: String, unique: true, required: true, dropDubs: true },
  status: String,
  createdOn: String,
  createdBy: String,
  modifiedOn: String,
  modifiedBy: String
});

/* Exporting Role Master For Future use */
module.exports = mongoose.model("RoleMaster", roleMasterSchema);
