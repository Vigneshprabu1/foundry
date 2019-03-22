/*
* module name: production
* sub-module name: knock-out
*/

/* module  */
const mongoose = require('mongoose');
const dateTime = require('node-datetime');

/* model  */
const KnockOut = require('../../model/production/knock-out');
const OnGoingMelt = require('../../model/production/onGoing-Melt');
const RawMaterialPreData = require('../../model/master/raw-material-pre-data');

/* controller  */
const MouldingController = require('../../controller/production/moulding');
const RawMaterialController = require('../../controller/production/raw-material');
const MeltReportController = require('../../controller/production/melt-report');
const ConsumableReportController = require('./raw-material-consumption-report');
const LabourController = require('../master/labour-master');


/* Getting knockout details with batchId */
exports.knockout_get = (req, res) => {
    const batchId = req.params.batchId;
    KnockOut.findOne({ 'batchId': batchId })
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json(err);
        });

};


/* save method  */
exports.knockout_save = (req, res) => {
    const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S');
    const knockOut = new KnockOut({
        _id: new mongoose.Types.ObjectId(),
        meltNo: req.body.meltNo,
        batchId: req.body.batchId,
        partId: req.body.partId,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        roughCastingWeight: req.body.roughCastingWeight,
        totalWorkingHours: req.body.totalWorkingHours,
        otHours: req.body.otHours,
        createdOn: date,
        createdBy: req.body.createdBy

    });
    knockOut.save()
        .then(result => {
            OnGoingMelt.findOneAndUpdate({ batchId: result.batchId }, {
                $set: {
                    knockout: result._id,
                    currentStatus:'KnockOut',
                    modifiedOn: date,
                    modifiedBy: req.body.modifiedBy
                }
            }, { new: true })
                .exec()
                .then(doc => {
                    const moldType = doc.moldType;
                    const meltWeight = doc.meltWeight;
                    const meltNo = req.body.meltNo;
                    rawmaterialDataFetching(doc, result, moldType, meltWeight, meltNo, req, res);
                    res.status(200).json(result);
                })
                .catch(err => {
                    res.status(500).json(err);
                });
        }) 
        .catch(err => {
            res.status(500).json(err);
        });
};


/* update data with objectId */
exports.knockout_update_with_ObjectId = (req, res, next) => {
    console.log('update method');
    const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S');
    var knockOutData;

    /* finding the moulding Details using BatchId */
    MouldingController.find_moulding_batchId(req.body.batchId)
        .then(docs4 => {
            var noOfPieces = docs4.noOfPieces;
            var knockout = KnockOut.findByIdAndUpdate({ _id: req.params._id }, {
                $set: {
                    meltNo: req.body.meltNo,
                    batchId: req.body.batchId,
                    partId: req.body.partId,
                    startTime: req.body.startTime,
                    endTime: req.body.endTime,
                    pouringWeight: req.body.pouringWeight,
                    roughCastingWeight: req.body.roughCastingWeight,
                    totalWorkingHours: req.body.totalWorkingHours,
                    otHours: req.body.otHours,
                    quantity: noOfPieces,
                    modifiedOn: date,
                    modifiedBy: req.body.modifiedBy
                }
            },
                { new: true })
                .exec()
                .then(doc => {
                    console.log(doc);
                    var roughCastingWeight = req.body.roughCastingWeight;
                    if (req.body.roughCastingWeight != null) {
                        var weight = Number(req.body.roughCastingWeight) * Number(noOfPieces);
                        /* property for melt report weight  updation in melt report controller*/
                        MeltReportController.update_melt_report(req, res, req.body.batchId, roughCastingWeight, weight);

                    }


                    res.status(200).json(doc);


                })
                .catch(err => {
                    res.status(500).json(err);
                });
        });
}

// /* update data with objectId */
// exports.knockout_update_with_ObjectId = (req, res, next) => {
//     const id = req.params._id;
//     var labourCost = 0.0;
//     var perCost = 0.0;
//     var typeOfCost = null;
//     var type = "KnockOut";
//     var weight=0.0;
//     var qty=0;
//     if (req.body.roughCastingWeight != null) {

//         /* finding the moulding Details using BatchId */
//         MouldingController.find_moulding_batchId(req.body.batchId)
//             .then(docs4 => {
//              qty=docs4.noOfPieces;
//                 var weight = Number(req.body.roughCastingWeight) * Number(qty);
//                 /* labour calculation */
//                 LabourController.labourCostCalculation(req, res, type, weight, qty).then(val => {

//                     for (var i = 0; i < val.length; i++) {
//                         labourCost = val[0];
//                         perCost = val[1];
//                         typeOfCost = val[2];
//                     }
//                     update_knock_out(req, res, id, labourCost, perCost, typeOfCost, weight, qty);
//                 })

//             })
//             .catch(err => {
//                 res.status(500).json(err);
//             });
//     }else{
//         update_knock_out(req, res, id, labourCost, perCost, typeOfCost, weight,qty);
//     }


// }

/* Instead of finding a  particular partId end time process has been given or not */
exports.knockout_check = (req, res) => {
    KnockOut.find({ 'meltNo': req.params.meltNo, "endTime": { "$exists": true } })
        .exec()
        .then(docs => {
            console.log('docs', docs);
            res.status(200).json(docs);
        })
        .catch(err => {
            res.status(500).json(err);
        })
}


/* fetching the data from rawmaterial */
async function rawmaterialDataFetching(doc, result, moldType, meltWeight, meltNo, req, res) {
    RawMaterialController.findRawMaterial_meltNo(meltNo)
        .then(rawResult => {
            console.log('rawResult', rawResult);
            rawResult.forEach(result => {
                var itemName = result.itemName;
                var itemType = result.itemType;
                var itemWeight = result.itemWeight;
                var perKgCost = result.perKGCost;
                var TotalWeightRawmaterial = 0.0;
                var TotalWeightConsumable = 0.0;
                RawMaterialPreData.findOne({ $and: [{ itemName: itemName }, { moldType: moldType }] })
                    .exec()
                    .then(preResult => {
                        console.log('preResult', preResult);
                        if (preResult) {
                            var itemPercentage = preResult.itemPercentage;
                            TotalWeightRawmaterial = Number(meltWeight) * (Number(itemPercentage) / 100);
                            ConsumableReportController.report_Save(doc, meltNo, itemName, itemType, itemWeight, TotalWeightRawmaterial, perKgCost);
                        }
                    })
                    .catch(err => {
                        res.status(500).json(err);
                    });

            });
        })


}

// /* knock out updation  */
// async function update_knock_out(req, res, id, labourCost, perCost, typeOfCost, weight, noOfPieces) {
//     const dt = dateTime.create();
//     const date = dt.format('Y-m-d H:M:S');
//     var knockOutData;
//     var knockout = KnockOut.findByIdAndUpdate({ _id: id }, {
//         $set: {
//             meltNo: req.body.meltNo,
//             batchId: req.body.batchId,
//             partId: req.body.partId,
//             startTime: req.body.startTime,
//             endTime: req.body.endTime,
//             pouringWeight: req.body.pouringWeight,
//             roughCastingWeight: req.body.roughCastingWeight,
//             totalWorkingHours: req.body.totalWorkingHours,
//             otHours: req.body.otHours,
//             labourCost: labourCost.toFixed(2),
//             perCost: perCost.toFixed(2),
//             typeOfCost: typeOfCost,
//             quantity: noOfPieces,
//             modifiedOn: date,
//             modifiedBy: req.body.modifiedBy
//         }
//     },
//         { new: true })
//         .exec()
//         .then(doc => {
//             console.log(doc);
//             var roughCastingWeight = req.body.roughCastingWeight;
//             /* property for melt report weight  updation in melt report controller*/
//             MeltReportController.update_melt_report(req, res, req.body.batchId, roughCastingWeight, weight)
//                 .then(docs => {
//                     res.status(200).json(doc);
//                 })

//         })
//         .catch(err => {
//             res.status(500).json(err);
//         });


// }

/* finding the knockout details using batchId */
async function find_knockout_batchId(batchId) {
    var knockOutData;
    var Data = await KnockOut.findOne({ 'batchId': batchId })
        .exec()
        .then(doc => {
            console.log(doc);
            knockOutData = doc;
            return knockOutData;
        });
    return knockOutData;
}

module.exports.find_knockout_batchId = find_knockout_batchId;



