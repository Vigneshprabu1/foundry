/* 
module name: Production
sub-module name: Rejection
*/

/* import module */
const mongoose = require('mongoose');
const dateTime = require('node-datetime');

/* model */
const Rejection = require('../../model/production/rejection');
const ReturnAndRejection = require('../../model/production/return-and-rejection');
const ReturnAndRejectionController = require('../../controller/production/return-and-rejection');
const MeltReport = require('../../model/production/melt-report');

/* controller */
const OnGoingMeltController = require('../../controller/production/onGoing-Melt');

/* get Rejection Details */
exports.get_rejection = (req, res) => {
    Rejection.find()
        .exec()
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => {
            res.status(500).json({
                "message": "error"
            })
        })
}





/* save rejection details */
exports.save_rejection = (req, res) => {
    // Getting the current time and date
    var dt = dateTime.create();
    var date = dt.format('Y-m-d H:M:S');
    var previousQuantity = 0.0;
    /* getting total weight from ongoing melt controller */
    OnGoingMeltController.find_with_batch_id(req.body.batchId).then(result => {
        previousQuantity = result.quantity;
        /* rejection percentage calculation */
        var rejectionPercentage = (Number(req.body.quantity) / Number(previousQuantity)) * 100;
        const rejection = new Rejection({
            _id: new mongoose.Types.ObjectId(),
            customerName: req.body.customerName,
            partId: req.body.partId,
            meltNo: req.body.meltNo,
            batchId: req.body.batchId,
            quantity: req.body.quantity,
            partWeight: req.body.partWeight,
            totalWeight: req.body.totalWeight,
            rejectionPercentage: rejectionPercentage.toFixed(2),
            reasonForRej: req.body.reasonForRej,
            createdOn: date,
            createdBy: req.body.createdBy
        });
        rejection.save()
            .then(docs => {
                MeltReport.updateOne({ 'batchId': docs.batchId }, {
                    $set:
                        {
                            rejectionWeight: docs.totalWeight,
                            rejectionPercentage:docs.rejectionPercentage,
                            modifiedOn: date,
                            modifiedBy: docs.createdBy
                        }
                },
                    { new: true })
                    .exec()
                    .then(docs1 => {
                        console.log(docs1);
                        ReturnAndRejectionController.return_save(req, res, docs.totalWeight, docs);
                    })
                    .catch(err => {
                        res.status(500).json(err);
                    });
                res.status(200).json(docs);

            })
            .catch(err => {
                res.status(500).json({
                    "message": "error"
                })
            })

    });




}