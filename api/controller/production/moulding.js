/*
* module name: production
* sub-module name: moulding
*/

/* import module  */
const mongoose = require('mongoose');
const dateFormat = require('dateformat');
const dateTime = require('node-datetime');
var exports = module.exports = {};

/* model */
const Moulding = require('../../model/production/moulding');
const OnGoingMelt = require('../../model/production/onGoing-Melt');

/** Controller */
const RawMaterialSummaryController = require('./raw-material-summary-report');
const MeltReportController = require('./melt-report');
const RawMaterialController = require('./raw-material');
const EmployeeController = require('../employee');
const LabourController = require('../../controller/master/labour-master');


/** Get particular data from database using batchId */
exports.moulding_get_particular = (req, res, next) => {

    Moulding.find({ 'batchId': req.params.batchId })
        .exec()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json(err);
        });
};


/** Moulding Update Method and Labour Calculation */
exports.moulding_update = (req, res, next) => {
    /** Getting the current time and date */
    const noOfPieces = req.body.noOfPieces;
    var type = 'Moulding-' + req.body.moldType;
    const weight = Number(req.body.weight) * Number(noOfPieces);
    var labourCost = 0.0;
    var perCost = 0.0;
    var typeOfCost = null;
    if(req.body.totalWorkingHours!=null){
        LabourController.labourCostCalculation(req, res, type, weight, noOfPieces,req.body.totalWorkingHours,req.body.otHours).then(val => {
            console.log('val', val)
            for (var i = 0; i < val.length; i++) {
                labourCost = val[0];
                perCost = val[1];
                typeOfCost = val[2];
            }
            if(labourCost==null){
                console.log('employee');
                   /* getting employee id from labour master */
                   LabourController.get_labour(type)
                   .then(result => {
                    var totalWorkingHours=Number(req.body.totalWorkingHours)+Number(req.body.otHours);
                       /* employee cost calculation*/
                       EmployeeController.employee_cost_calculation(result.employeeId,totalWorkingHours)
                           .then(empResult => {
                               labourCost = empResult;
                               perCost=Number(labourCost)/Number(noOfPieces);
                               typeOfCost='HOUR'
                               moulding_update(req, res, labourCost, perCost, typeOfCost);

                           });
                   });

            }else{
                moulding_update(req, res, labourCost, perCost, typeOfCost);
            }

        });

    }else{
        moulding_update(req, res, labourCost, perCost, typeOfCost);

    }
  
};


/* checking all partId complete the melt process or not using end date */
exports.completed_moulding_or_not = (req, res, next) => {
    let i = 1;
    Moulding.find({ meltNo: req.params.meltno })
        .exec()
        .then((result) => {
            const resultArray = result;
            resultArray.forEach(res1 => {
                if (res1.endDate == undefined || res1.startDate == undefined) {
                    res.status(200).json({
                        'message': 'Not-Completed', res1
                    });
                } else {
                    console.log('ok')
                    if (resultArray.length == i)
                        res.status(200).json({
                            'message': 'Completed', res1
                        });
                }
                i++;
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });

}

/** Moulding Update Method */
async function moulding_update(req, res, labourCost, perCost, typeOfCost) {
console.log('upate');
    var dt = dateTime.create();
    var date = dt.format('Y-m-d H:M:S');
   await  Moulding.updateOne({ 'batchId': req.body.batchId }, {
        $set: {
            meltNo: req.body.meltNo,
            partId: req.body.partId,
            batchId: req.body.batchId,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            topWeight:req.body.topWeight,
            bottomWeight:req.body.bottomWeight,
            weight: req.body.weight,
            noOfPieces: req.body.noOfPieces,
            moldType: req.body.moldType,
            totalWorkingHours: req.body.totalWorkingHours,
            otHours: req.body.otHours,
            labourCost: labourCost.toFixed(2),
            perCost: perCost.toFixed(2),
            typeOfCost: typeOfCost,
            modifiedOn: date,
            modifiedBy: req.body.modifiedBy

        }
    },
        { new: true })
        .then(doc => {
            if (req.body.weight != null) {
                /** Function for Report generation */
                reportGeneration(req, res, req.body.meltNo);
            }
            else {
                res.status(200).json(doc);
            }
        })
        
}
  




/** Raw Material Report Save */
function reportGeneration(req, res, meltNo) {
    console.log("Report Save");
    var dt = dateTime.create();
    var date = dt.format('Y-m-d H:M:S');

    /** Find Raw Material Summary Report*/
    RawMaterialSummaryController.find_raw_material_summary(meltNo)
        .then(summaryResult => {
            if (summaryResult.length == 0) {
                /** Get Melt Date From Melt Report */
                MeltReportController.get_melt_report_using_batchId(req.body.batchId)
                    .then(docs => {
                        if (docs != null) {
                            /* getting item Name from Rawmaterial */
                            RawMaterialController.findRawMaterial_meltNo(meltNo)
                                .then(rawmaterialResult => {
                                    var i = 1;
                                    rawmaterialResult.forEach(result => {
                                        RawMaterialSummaryController.save_raw_material_summary(req, res, docs, meltNo, result);
                                        console.log('i', i, 'length', rawmaterialResult.length)
                                        if (i == rawmaterialResult.length) {
                                            console.log('i', i, 'length in', rawmaterialResult.length)
                                            res.status(200).json(docs);
                                        }
                                        i++;
                                    });
                                });
                        }
                    });
            } else {
                res.status(200).json(summaryResult);
            }

        })
        .catch(err => {
            res.status(500).json(err);
        });
}

/** finding moulding details using batchId */

async function find_moulding_batchId(batchId) {

    var mouldData;
    var mould = await Moulding.findOne({ 'batchId': batchId })
        .exec()
        .then(docs => {
            mouldData = docs;
            return mouldData;
        })
    return mouldData;


}

/** Moulding Save */
function save_moulding(req, res, ongoingmelts, melt) {

    var dt = dateTime.create();
    var date = dt.format('Y-m-d H:M:S');
    const moulding = new Moulding({
        _id: new mongoose.Types.ObjectId,
        meltNo: melt.meltNo,
        partId: ongoingmelts.partId,
        batchId: ongoingmelts.batchId,
        noOfPieces: ongoingmelts.quantity,
        moldType: ongoingmelts.moldType,
        createdOn: date,
    });
    moulding.save()
        .then(results => {
            OnGoingMelt.updateOne({ batchId: results.batchId }, {
                $set: {
                    moulding: results._id,
                    currentStatus:'Moulding',
                }
            }, { new: true })
                .exec()
                .then(doc => {
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    });
                });
        }).catch((err) => {
            res.status(500).json({
                error: err
            });
        });

}

module.exports.save_moulding = save_moulding;
module.exports.find_moulding_batchId = find_moulding_batchId;

