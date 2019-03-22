/*
* module name: production
* sub-module name: melt-report
*/ 

/* modules */
const mongoose = require('mongoose');
const dateTime = require('node-datetime');
var request = require('request');

/* Model */
const MeltReport = require('../../model/production/melt-report');

/* Controller */
const OngoingController = require('./onGoing-Melt');

/** Get all Melt Report */
exports.get_all_melt_report = (req, res) => {
    MeltReport.find()
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json(err);
        });
}


/** Get Melt Report using Meltno */
exports.get_melt_report_using_meltNo = (req, res) => {
    const meltNo = req.params.meltNo;
    MeltReport.find({ 'meltNo': meltNo })
        .exec()
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {
            res.status(500).json(err);
        });
}





/* get datewise Melt report */
exports.get_datewise_melt_report = (req, res) => {
    const fromDate = req.body.fromDate;
    const toDate = req.body.toDate;
    MeltReport.find({
        "meltDate": {
            $gte: fromDate,
            $lt: toDate
        }
    })
        .exec()
        .then(docs1 => {
            console.log('docs1', docs1);
            res.status(200).json(docs1);
        }).catch(err => {
            res.status(500).json(err)
        });
}

/* customized report */
exports.get_selected_report = (req, res) => {
    const customerName = req.body.customerName;
    const meltNo = req.body.meltNo;
    const partId = req.body.partId;
    const fromDate = req.body.fromDate;
    const toDate = req.body.toDate;
    if ((customerName != undefined || customerName != '') && (partId == undefined || partId == '') && (meltNo == undefined || meltNo == '') && toDate == undefined) {
        MeltReport.find({ 'customerName': customerName })
            .exec()
            .then(result => {
                console.log('result', result);
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(500).json(err);
            });
    }
    else if ((customerName == undefined || customerName == '') && (partId != undefined || partId != '') && (meltNo == undefined || meltNo == '') && toDate == undefined) {
        MeltReport.find({ 'partId': partId })
            .exec()
            .then(result => {
                console.log('result', result);
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(500).json(err);
            });
    }
    else if ((customerName == undefined || customerName == '') && (partId == undefined || partId == '') && (meltNo != undefined || meltNo != '') && toDate == undefined) {
        MeltReport.find({ 'meltNo': meltNo })
            .exec()
            .then(result => {
                console.log('result', result);
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(500).json(err);
            });
    }
    else if ((customerName == undefined || customerName == '') && (partId == undefined || partId == '') && (meltNo == undefined || meltNo == '') && toDate != undefined) {
        MeltReport.find({
            "meltDate": {
                $gte: fromDate,
                $lt: toDate
            }
        })
            .exec()
            .then(result => {
                console.log('resulr', result);
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(500).json(err);
            });
    }
    else if ((customerName != undefined || customerName != '') && (partId != undefined || partId != '') && (meltNo == undefined || meltNo == '') && toDate == undefined) {
        MeltReport.find({ $and: [{ "customerName": customerName }, { "partId": partId }] })
            .exec()
            .then(result => {
                console.log('result', result);
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(500).json(err);
            });
    }
    else if ((customerName != undefined || customerName != '') && (partId == undefined || partId == '') && (meltNo != undefined || meltNo != '') && toDate == undefined) {
        MeltReport.find({ $and: [{ "customerName": customerName }, { "meltNo": meltNo }] })
            .exec()
            .then(result => {
                console.log('result', result);
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(500).json(err);
            });
    }
    else if ((customerName != undefined || customerName != '') && (partId == undefined || partId == '') && (meltNo == undefined || meltNo == '') && toDate != undefined) {
        MeltReport.find({
            $and: [{ "customerName": customerName }, {
                "meltDate": {
                    $gte: fromDate,
                    $lt: toDate
                }
            }]
        })
            .exec()
            .then(result => {
                console.log('result', result);
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(500).json(err);
            });
    }
    else if ((customerName == undefined || customerName == '') && (partId != undefined || partId != '') && (meltNo != undefined || meltNo != '') && toDate == undefined) {
        MeltReport.find({ $and: [{ "partId": partId }, { "meltNo": meltNo }] })
            .exec()
            .then(result => {
                console.log('result', result);
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(500).json(err);
            });
    }
    else if ((customerName == undefined || customerName == '') && (partId != undefined || partId != '') && (meltNo == undefined || meltNo == '') && toDate != undefined) {
        MeltReport.find({
            $and: [{ "partId": partId }, {
                "meltDate": {
                    $gte: fromDate,
                    $lt: toDate
                }
            }]
        })
            .exec()
            .then(result => {
                console.log('resulr', result);
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(500).json(err);
            });
    }
    else if ((customerName == undefined || customerName == '') && (partId == undefined || partId == '') && (meltNo != undefined || meltNo != '') && toDate != undefined) {
        MeltReport.find({
            $and: [{ "meltNo": meltNo }, {
                "meltDate": {
                    $gte: fromDate,
                    $lt: toDate
                }
            }]
        })
            .exec()
            .then(result => {
                console.log('result', result);
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(500).json(err);
            });
    }
    else if ((customerName != undefined || customerName != '') && (partId != undefined || partId != '') && (meltNo != undefined || meltNo != '') && toDate == undefined) {
        MeltReport.find({ $and: [{ "partId": partId }, { "meltNo": meltNo }] })
            .exec()
            .then(result => {
                console.log('result', result);
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                })
            })
    }
    else if ((customerName != undefined || customerName != '') && (partId != undefined || partId != '') && (meltNo == undefined || meltNo == '') && toDate != undefined) {
        MeltReport.find({
            $and: [{ "partId": partId }, { "customerName": customerName }, {
                "meltDate": {
                    $gte: fromDate,
                    $lt: toDate
                }
            }]
        })
            .exec()
            .then(result => {
                console.log('result', result);
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(500).json(err);
            });
    } else if ((customerName != undefined || customerName != '') && (partId != undefined || partId != '') && (meltNo != undefined || meltNo != '') && toDate != undefined) {
        MeltReport.find({
            $and: [{ "partId": partId }, { "customerName": customerName }, { "meltNo": meltNo }, {
                "meltDate": {
                    $gte: fromDate,
                    $lt: toDate
                }
            }]
        })
            .exec()
            .then(result => {
                console.log('resulr', result);
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(500).json(err);
            });
    }
}

/* get_date_customerwise_report */
exports.get_date_customerwise_report = (req, res) => {
    const fromDate = req.body.fromDate;
    const toDate = req.body.toDate;
    const customerName = req.body.customerName;
    MeltReport.find({
        "meltDate": {
            $gte: req.body.fromDate,
            $lt: req.body.toDate
        }
    })
        .where('customerName')
        .equals(req.body.customerName)
        .exec()
        .then(docs1 => {
            res.status(200).json(docs1);
        }).catch(err => {
            res.status(500).json(err);
        });
}

/* getting melt report pdf format*/
exports.get_melt_report_all_ptf = (req, res) => {
    var data = {
        template: { 'shortid': 'H1wDyd_XV' },
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
/* getting melt report excel format*/
exports.get_melt_report_all_xlsx = (req, res) => {

    var data = {
        template: { 'shortid': 'ryvK1uOQV' },
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

/*  melt report save */
async function melt_report_save(req, res, ongoingMelt, melt) {
    console.log('Save Melt Report', ongoingMelt, 'melt', melt);
    const meltReport = new MeltReport({
        _id: new mongoose.Types.ObjectId(),
        orderId: ongoingMelt.orderId,
        meltNo: melt.meltNo,
        meltDate: melt.meltStartDate,
        orderDate: ongoingMelt.orderDate,
        customerName: ongoingMelt.customerName,
        deliveryDate: ongoingMelt.deliveryDate,
        moldType: ongoingMelt.moldType,
        batchId: ongoingMelt.batchId,
        partId: ongoingMelt.partId,
        quantity: ongoingMelt.quantity,
        partWeight: Number(ongoingMelt.meltWeight) / Number(ongoingMelt.quantity),
        moldType:ongoingMelt.moldType,
        totalWeight: ongoingMelt.meltWeight,
        status: "ON"
    });
    meltReport.save()
        .then(doc => {
            console.log('Melt Report', doc);
        })
        .catch(err => {
            res.status(500).json({
                'message': 'melt Report not Saved'
            })
        })
}

/** Get Melt Report using Batch Id */
async function get_melt_report_using_batchId(batchId) {
    var melt;
    var ss = await MeltReport.findOne({ 'batchId': batchId })
        .exec()
        .then(docs => {
            melt = docs;
        })
        .catch(err => {
            res.status(500).json({
                "message": "error"
            });
        });
    return melt;
}

/* melt report  weight updation function */
async function update_melt_report(req, res, batchId, roughCastingWeight, mouldWeight) {
    console.log("melt report update method");
    const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S');
    var updateData;
    var meltData = await MeltReport.updateOne({ 'batchId': batchId }, {
        $set:
            {
                roughCastingWeight: roughCastingWeight,
                mouldWeight: mouldWeight,
                modifiedOn: date,
                modifiedBy: req.body.modifiedBy
            }
    },
        { new: true })
        .exec()
        .then(docs1 => {
            updateData = docs1;
            return updateData;

        })
        .catch(err => {
            res.status(500).json(err);
        });
    return updateData;
}

/* melt report  weight updation function */
async function update_melt_reports(req, res) {
    OngoingController.find_batchId(req.body._id)
        .then(docs => {
            MeltReport.updateOne({ 'batchId': docs.batchId }, {
                $set:
                    {
                        meltData: req.body.meltStartDate,
                    }
            },
                { new: true })
                .exec()
                .then(docs1 => {
                    console.log(docs1);
                })
                .catch(err => {
                    res.status(500).json(err);
                });
        })

}

module.exports.update_melt_report = update_melt_report;
module.exports.update_melt_reports = update_melt_reports;
module.exports.get_melt_report_using_batchId = get_melt_report_using_batchId;
module.exports.melt_report_save = melt_report_save;