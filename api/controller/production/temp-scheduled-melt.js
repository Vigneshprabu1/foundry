const mongoose= require('mongoose');
//node js date time
const dateTime = require('node-datetime');
// Schema
const CompletedMelt=require('../../model/production/completed-melt');
const OnGoingMelt=require('../../model/production/onGoing-Melt');
const TempSchMelt= require('../../model/production/temp-scheduled-melt');

// Save to tempSchedule Melt
exports.save_temp_sch_melt = (req, res) => {
    var meltId = req.body.scheduledId;
    const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S');
   // var quantity = req.body.quantity;
    TempSchMelt.find({ 'scheduledId': meltId })
        .exec()
        .then((doc) => {
            if (doc.length >= 1) {
                TempSchMelt.findOneAndDelete({ 'scheduledId': meltId })                  
                    .exec()
                    .then(doc => {
                        res.status(200).json(doc);
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err
                        })
                    })
            } else {
                const tempScheduleMelt = new TempSchMelt({
                    _id: new mongoose.Types.ObjectId(),
                    scheduledId: meltId,
                    createdBy:req.body.createdBy,
                    createdOn:date,
                });
                tempScheduleMelt.save()
                    .then((result) => {
                        console.log(result)
                        res.status(200).json(result);
                    })
                    .catch((err) => {
                        res.status(500).json({
                            message: 'Error '
                        });
                    });
            }
        })
}
        
async function find_temp_schedule(req,res){
    var schedule;
     await TempSchMelt.find()
    .exec()
    .then(doc => {
        schedule =doc;
    })
    .catch(err => {
        res.status(500).json({
            error:err
        });
    });
    return schedule;
}

module.exports.find_temp_schedule = find_temp_schedule;