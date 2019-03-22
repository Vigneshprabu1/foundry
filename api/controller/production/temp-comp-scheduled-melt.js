const mongoose = require('mongoose');
// Schema
const CompletedMelt = require('../../model/production/completed-melt');
const OnGoingMelt = require('../../model/production/onGoing-Melt');
const TempSchMelt = require('../../model/production/temp-scheduled-melt');

// Save to tempSchedule Melt
exports.save_temp_com_melt = (req, res) => {
    var meltId = req.body.scheduledId;
    var quantity = req.body.quantity;
    TempSchMelt.find({ 'scheduledId': meltId })
        .exec()
        .then((doc) => {
            if (doc.length >= 1) {
                TempSchMelt.update({ 'scheduledId': meltId }, {
                    $set: {
                        quantity: req.body.quantity,
                        meltWeight: Number(quantity) * Number(req.body.partWeight)
                    }
                },
                    { new: true })
                    .exec()
                    .then(doc => {
                        res.status(200).json(doc)
                    })
                    .catch(err => {
                        res.status(500).json({
                            error: err
                        })
                    })
            } else {
                const tempScheduleMelt = new TempSchMelt({
                    _id: new mongoose.Types.ObjectId(),
                    scheduledId: req.body.scheduledId,
                    quantity: quantity,
                    partId: req.body.partId,
                    partWeight: req.body.partWeight,
                    orderId: req.body.orderId,
                    meltWeight: Number(req.body.partWeight) * Number(req.body.quantity),
                });
                tempScheduleMelt.save()
                    .then(result => {
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


//drop tempScheduleTable
exports.remove_temp_sch_melt = (req, res) => {
    TempSchMelt.remove()
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json({
                message: 'Error '
            });
        });
}



