/* import module */
const mongoose = require("mongoose");

/*  creating the activity master schema */
const activityMasterSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  activityType: { type: String, unique: true, required: true, dropDubs: true },
  createdOn: String,
  createdBy: String,
  modifiedOn: String,
  modifiedBy: String,
  status: String
});

/* exporting the schema for further use*/
module.exports = mongoose.model("ActivityMaster", activityMasterSchema);
