/* 
module name: Production(Report)
sub-module name: RawMaterialConsumption Report
*/
 
/* import module */
const mongoose = require('mongoose');
const dateTime = require('node-datetime');
var request = require('request');

 /* model */
const RawMaterialConsumptionReport = require('../../model/production/raw-material-consumption-report');

/*  get RawMaterial Consumption Report */
exports.get_raw_material_report = (req, res) => {
    RawMaterialConsumptionReport.find()
        .exec()
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}

/* combined data filtering for rawmaterialconsumption report */
exports.raw_material_consumption_report_combination = (req, res) => {

    if (req.body.partId && !req.body.meltNo && !req.body.orderId) {

        if ((req.body.fromDate && req.body.toDate) && req.body.partId) {

            RawMaterialConsumptionReport.find({
                $and: [{ partId: req.body.partId }, {
                    meltDate: {
                        $gte: req.body.fromDate,
                        $lt: req.body.toDate
                    }
                }]
            })
                .exec()
                .then(doc => {
                    res.status(200).json(doc);
                })
                .catch(err => {
                    res.status(500).json(err);
                });

        } else {
            RawMaterialConsumptionReport.find()
                .where('partId')
                .equals(req.body.partId)
                .exec()
                .then(result => {
                    res.status(200).json(result);
                })
                .catch(err => {
                    res.status(500).json(err);
                });
        }



    } else if (!req.body.partId && req.body.meltNo && !req.body.orderId) {

        if ((req.body.fromDate && req.body.toDate) && req.body.meltNo) {
            RawMaterialConsumptionReport.find({
                $and: [{ meltNo: req.body.meltNo }, {
                    meltDate: {
                        $gte: req.body.fromDate,
                        $lt: req.body.toDate
                    }
                }]
            })
                .exec()
                .then(doc => {
                    res.status(200).json(doc);
                })
                .catch(err => {
                    res.status(500).json(err);
                });
        } else {
            RawMaterialConsumptionReport.find()
                .where('meltNo')
                .equals(req.body.meltNo)
                .exec()
                .then(result => {
                    res.status(200).json(result);
                })
                .catch(err => {
                    res.status(500).json(err);
                });
        }
    } else if (!req.body.partId && !req.body.meltNo && req.body.orderId) {

        if ((req.body.fromDate && req.body.toDate) && req.body.orderId) {

            RawMaterialConsumptionReport.find({
                $and: [{ orderId: req.body.orderId }, {
                    meltDate: {
                        $gte: req.body.fromDate,
                        $lt: req.body.toDate
                    }
                }]
            })
                .exec()
                .then(doc => {
                    res.status(200).json(doc);
                })
                .catch(err => {
                    res.status(500).json(err);
                });

        } else {

            RawMaterialConsumptionReport.find()
                .where('orderId')
                .equals(req.body.orderId)
                .exec()
                .then(result => {
                    console.log(result);
                    res.status(200).json(result);
                })
                .catch(err => {
                    res.status(500).json(err);
                });

        }

    } else if (req.body.partId && req.body.meltNo && !req.body.orderId) {

        RawMaterialConsumptionReport.find({ $and: [{ partId: req.body.partId }, { meltNo: req.body.meltNo }] })
            .exec()
            .then(result => {
                console.log(result);
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(500).json(err);
            });


    } else if (req.body.partId && !req.body.meltNo && req.body.orderId) {

        RawMaterialConsumptionReport.find({ $and: [{ partId: req.body.partId }, { orderId: req.body.orderId }] })
            .exec()
            .then(result => {
                console.log(result);
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(500).json(err);
            });

    } else if (!req.body.partId & req.body.meltNo & req.body.orderId) {

        RawMaterialConsumptionReport.find({ $and: [{ meltNo: req.body.meltNo }, { orderId: req.body.orderId }] })
            .exec()
            .then(result => {
                console.log(result);
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(500).json(err);
            });

    } else if ((req.body.partId && req.body.meltNo) && req.body.orderId) {

        if ((req.body.fromDate && req.body.toDate) && req.body.orderId && req.body.partId && req.body.meltNo) {

            RawMaterialConsumptionReport.find({
                $and: [{ partId: req.body.partId }, { meltNo: req.body.meltNo }, { orderId: req.body.orderId }, {
                    meltDate: {
                        $gte: req.body.fromDate,
                        $lt: req.body.toDate
                    }
                }]
            })
                .exec()
                .then(doc => {
                    res.status(200).json(doc);
                })
                .catch(err => {
                    res.status(500).json(err);
                });
        } else {

            RawMaterialConsumptionReport.find({ $and: [{ partId: req.body.partId }, { meltNo: req.body.meltNo }, { orderId: req.body.orderId }] })
                .exec()
                .then(result => {
                    res.status(200).json(result);
                })
                .catch(err => {
                    res.status(500).json(err);
                });
        }


    } else if (req.body.fromDate && req.body.toDate) {
        RawMaterialConsumptionReport.find({
            meltDate: {
                $gte: req.body.fromDate,
                $lte: req.body.toDate
            }
        })
            .exec()
            .then(doc => {
                res.status(200).json(doc);
            })
            .catch(err => {
                res.status(500).json(err);
            });

    } else if ((req.body.fromDate && req.body.toDate) && req.body.partId) {

        RawMaterialConsumptionReport.find({
            $and: [{ partId: req.body.partId }, {
                meltDate: {
                    $gte: req.body.fromDate,
                    $lt: req.body.toDate
                }
            }]
        })
            .exec()
            .then(doc => {
                res.status(200).json(doc);
            })
            .catch(err => {
                res.status(500).json(err);
            });
    }


};

/*  getting pdf format report*/

exports.get_raw_material_report_all_ptf = (req, res) => {
    var data = {
        template: { 'shortid': 'B1DCqFumE' },
        data: {
            "name": 'Murugan',
        },
        options: {
            preview: false
        }
    }
    var options = {
        url: 'http://localhost:5400/api/report/',
        method: 'POST',
        json: data
    }
    request(options).pipe(res);
}

/*  getting excel format report*/
exports.get_raw_material_report_all_xlsx = (req, res) => {

    var data = {
        template: { 'shortid': 'BJU1jK_m4' },
        data: {
            "name": 'Murugan',
        },
        options: {
            preview: false
        }
    }
    var options = {
        url: 'http://localhost:5400/api/report/',
        method: 'POST',
        json: data
    }
    request(options).pipe(res);
}

/* rawmaterial consumption report save function  */

async function report_Save(doc, meltNo, itemName, itemType, TotalWeightRawmaterial, perKgCost, res) {
    const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S');
    var rawMaterialTotalWeight=0.0;
    var consumablesTotalWeight=0.0;
    if(itemType=='RawMaterial'){
         rawMaterialTotalWeight=TotalWeightRawmaterial;

    }else if(itemType=='Consumable') {
         consumablesTotalWeight=TotalWeightRawmaterial;
    }
    const rawMaterialConsumptionReport = new RawMaterialConsumptionReport({
        _id: new mongoose.Types.ObjectId(),
        partId: doc.partId,
        meltNo: meltNo,
        batchId: doc.batchId,
        quantity: doc.quantity,
        orderId: doc.orderId,
        rawMaterialTotalWeight: rawMaterialTotalWeight.toFixed(2),
        consumablesTotalWeight: consumablesTotalWeight.toFixed(2) ,
        totalCostRawMaterial: (Number(rawMaterialTotalWeight) * Number(perKgCost)).toFixed(2),
        totalCostConsumables: (Number(consumablesTotalWeight) * Number(perKgCost)).toFixed(2),
        itemName: itemName,
        itemType: itemType,
        createdOn: date

    })
    rawMaterialConsumptionReport.save()
        .then(doc => {
        })
        .catch(err => {
            res.status(500).json(err);
        });
}



module.exports.report_Save=report_Save;