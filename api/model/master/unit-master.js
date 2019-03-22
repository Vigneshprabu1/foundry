/* import module */
const mongoose = require("mongoose");

/*  creating the unit master schema */
const unitMasterSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  unitType: { type: String, unique: true, required: true, dropDubs: true },
  createdOn: String,
  createdBy: String,
  modifiedOn: String,
  modifiedBy: String,
  status: String
});

/* exporting the schema for further use*/
module.exports = mongoose.model("UnitMaster", unitMasterSchema);
