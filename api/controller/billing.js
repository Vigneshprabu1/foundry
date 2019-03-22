const dateTime = require('node-datetime');
const mongoose=require('mongoose');

/** Controller */

const OnGoingController = require('./production/onGoing-Melt');

exports.save_billing = (req,res) => {
    var batchId = re.params.batchId;
    OnGoingController.get_all_ongoing_melt(batchId);
}