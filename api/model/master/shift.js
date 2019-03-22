/* import module */
const mongoose = require('mongoose');

/*  creating the painting master schema */
const shiftSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    shift: String,
    startTime: String,
    endTime: String,
    totalHours: Number,
    status: String,
    createdOn:String,
    createdBy:String,
    modifiedOn:String,
    modifiedBy:String
});

/* exporting the schema for further use*/
module.exports = mongoose.model('Shift', shiftSchema);