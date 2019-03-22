/* 
module name:production
sub-module name:yield
*/

/* modules */
const mongoose = require('mongoose');
const dateTime = require('node-datetime');

/* model */
const Yield = require('../../model/production/yield');
const ReturnAndRejection = require('../../model/production/return-and-rejection');
const OnGoingMelt = require('../../model/production/onGoing-Melt');
const MeltReport = require('../../model/production/melt-report');

/* controller */
const KnockOutController = require('../../controller/production/knock-out');
const OnGoingMeltController = require('../../controller/production/onGoing-Melt');
const ReturnAndRejectionController = require('../../controller/production/return-and-rejection');



/* yield Calculation and save mathod */
async function yieldWeightEntry(req, res, fettlingResult) {
    console.log('yield function called');
    /* getting data from ongoing melt controller using batchId */
    OnGoingMeltController.ongoing_melt_find_batch_status(fettlingResult.batchId)
        .then((result) => {
            /* getting data from knock-out controller using batchId */
            KnockOutController.find_knockout_batchId(fettlingResult.batchId)
                .then(knockOutResult => {
                    console.log('knockOutResult', knockOutResult);
                    var roughCastingWeight = knockOutResult.roughCastingWeight;
                    var yieldWeight = ((Number(result.quantity) * Number(roughCastingWeight)) / Number(result.meltWeight)).toFixed(2);
                    var yieldPercentage = (Number(yieldWeight) * 100).toFixed(2);
                    var returnWeight = ((1 - Number(yieldWeight)) * 100).toFixed(2);
                    yield_save(req, res, knockOutResult, roughCastingWeight, result.quantity, result.meltWeight, yieldWeight, yieldPercentage, returnWeight, fettlingResult);

                }
                )
        })





}

/* yield save function */
async function yield_save(req, res, knockOutResult, roughCastingWeight, partQty, meltWeight, yieldWeight, yieldPercentage, returnWeight, fettlingResult) {
    console.log(' yield Save Method Called');
    const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S');
    const yield = await new Yield({
        _id: new mongoose.Types.ObjectId(),
        meltNo: knockOutResult.meltNo,
        batchId: knockOutResult.batchId,
        partId: knockOutResult.partId,
        meltWeight: meltWeight,
        roughCastingWeight: roughCastingWeight,
        roughCastingTotalWeight: Number(roughCastingWeight) * Number(partQty),
        quantity: partQty,
        yieldWeight: yieldWeight,
        yieldPercentage: yieldPercentage,
        returnWeight: returnWeight,
        createdOn: date,
    });
    yield.save()
        .then(yieldResult => {
            /* yield id will be updated in ongoing melt based on batchId */
            OnGoingMelt.updateOne({ 'batchId': knockOutResult.batchId }, {
                $set: {
                    yield: yieldResult._id,
                }
            },
                { new: true })
                .exec()
                .then(ongoingResult => {
                    /* yield percentage and return weight updation in melt report based on batchId */
                    MeltReport.updateOne({ 'batchId': knockOutResult.batchId }, {
                        $set: {
                            yieldPercentage: yieldPercentage,
                            returnWeight: returnWeight
                        }
                    },
                        { new: true })
                        .exec()
                        .then(meltResult => {
                            /* return and rejection save method */
                            ReturnAndRejectionController.return_save(req, res, returnWeight, fettlingResult)
                                .then(val => {
                                    console.log(val, 'Result');
                                    res.status(200)
                                        .json(fettlingResult);
                                });

                        })
                        .catch(err => {
                            res.status(500).json(err);
                        });
                })
                .catch(err => {
                    res.status(500).json(err);
                });
        })
        .catch(err => {
            res.status(500).json(err);
        });



}

/* finding the yield data using batchId*/

async function yield_find_batchId(batchId) {
    var yieldData;
    var data = await Yield.findOne({ 'batchId': batchId })
        .exec()
        .then(doc => {
            yieldData = doc;
            return yieldData;
        });
    return yieldData;
}

module.exports.yield_find_batchId = yield_find_batchId;
module.exports.yieldWeightEntry = yieldWeightEntry;