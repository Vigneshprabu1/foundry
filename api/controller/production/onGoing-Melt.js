/*
* module name: production
* sub-module name: ongoing-melt
*/
/* import module */
const mongoose = require("mongoose");
const fs = require("fs");
const dateTime = require("node-datetime");
/** model */
const OnGoingMelt = require("../../model/production/onGoing-Melt");
const MeltReport = require("../../model/production/melt-report");

/** controller */
const MeltController = require("./Melt");
const TempScheduleController = require("./temp-scheduled-melt");
const ScheduleController = require("./schedule-melt");
const MeltReportController = require("./melt-report");
const MoldingController = require("./moulding");
const CoreMakingController = require('./core-making');
const CompletedMelt = require('../../controller/production/completed-melt');

/** Getting  data from ongoingMeltTable by MeltId */
exports.get_ongoing_melt = (req, res, next) => {
    const _id = req.params.meltId;
    OnGoingMelt.find({ meltId: _id })
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json({
                message: "There is an Error"
            });
        });
};


exports.get_ongoing_melt_batchId = (req, res, next) => {
    const batchId = req.params.batchId;
    OnGoingMelt.findOne({ batchId: batchId })
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json({
                message: "There is an Error"
            });
        });
};

exports.get_ongoing_melt_customerName = (req, res, next) => {
    if (req.body.customerName && !req.body.orderId) {
        OnGoingMelt.find()
            .populate("meltId")
            .where("customerName")
            .equals(req.body.customerName)
            .exec()
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(500).json({
                    message: "There is an Error"
                });
            });
    } else if (!req.body.customerName && req.body.orderId) {
        OnGoingMelt.find()
            .populate("meltId")
            .where("orderId")
            .equals(req.body.orderId)
            .exec()
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(500).json({
                    message: "There is an Error"
                });
            });
    } else if (req.body.customerName && req.body.orderId) {
        OnGoingMelt.find({ customerName: req.body.customerName })
            .populate("meltId")
            .where("orderId")
            .equals(req.body.orderId)
            .exec()
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(500).json({
                    message: "There is an Error"
                });
            });
    }
};

//change the status as completed while we know that ongoing process will be completed so it will be converted as completed melt
exports.ongoing_melt_status_change = (req, res) => {
    // Getting the current time and date
    var dt = dateTime.create();
    var date = dt.format('Y-m-d H:M:S');
    const batchId = req.params.batchId;
    OnGoingMelt.findOneAndUpdate({ 'batchId': batchId }, {
        $set: {
            status: 'C',
            modifiedOn: date
        }
    },
        { new: true })
        .exec()
        .then(result => {
            console.log(result);
            MeltReport.findOneAndUpdate({ 'batchId': batchId }, {
                $set: {
                    status: "C"
                }
            },
                { new: true })
                .exec()
                .then(res1 => {
                    /*  Change the ongoing melt as completed Melt*/
                    CompletedMelt.update_scheduled_melt_as_completed_melt(batchId).then(docs => {
                        console.log('docs', docs);
                        res.status(200).json(docs);
                    })
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err
                    })
                })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
}

/*update ongoing melt with batchId */
exports.update_ongoing_melt = (req, res) => {
    // Getting the current time and date
    var dt = dateTime.create();
    var date = dt.format('Y-m-d H:M:S');
    console.log('req.body',req.body);
    const batchId = req.body.batchId;
    OnGoingMelt.findOneAndUpdate({ 'batchId': batchId }, {
        $set: {
            meltWeight: req.body.meltWeight,
            modifiedOn: date,
            modifiedBy: req.body.modifiedBy
        }
    },
        { new: true })
        .exec()
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {
            res.status(500).json({
                error: error
            })
        })

}


/** Schedule the Melt */
exports.schedule_melt = (req, res) => {
    console.log("in");
    var dt = dateTime.create();
    var date = dt.format("Y-m-d H:M:S");
    var i = 1;
    let j;
    var month;
    var k = 64;
    var s;
    month = date.substring(5, 7);
    for (j = 01; j <= month; j++) {
        k++;
    }
    if (k > 72) {
        k++;
        s = String.fromCharCode(k);
    } else {
        s = String.fromCharCode(k);
    }
    /** Save Melt in Melt Controller */
    MeltController.save_melt(req, res, date, s).then(doc => {
        var melt = doc;
        /** Find temp schedule in temp schedule Controller */
        TempScheduleController.find_temp_schedule(req, res).then(doc1 => {
            if (doc1.length > 0) {
                doc1.forEach(element => {
                    /** Find Schedule with particualr id  in Schedule Controller */
                    ScheduleController.find_schedule_id(req,res,element.scheduledId
                    ).then(doc2 => {
                        var Schedule = doc2;
                        /** Save OnGoing Melt */
                        save_ongoing_melt(req, res, melt, Schedule, element.scheduledId);
                        if (i == doc1.length) {
                            res.status(200).json(doc2);
                        }
                        i++;
                    });
                });
            }
        });
    });
};

/** Save the OnGoing Melt */
function save_ongoing_melt(req, res, melt, Schedule, scheduledId) {
    var dt = dateTime.create();
    var date = dt.format("Y-m-d H:M:S");
    const ongoingmelt = new OnGoingMelt({
        _id: new mongoose.Types.ObjectId(),
        customerName: Schedule.customerName,
        orderId: Schedule.orderId,
        deliveryDate: Schedule.deliveryDate,
        orderDate: Schedule.orderDate,
        meltId: melt._id,
        moldType: Schedule.moldType,
        partId: Schedule.partId,
        paintingType: Schedule.paintingType,
        meltWeight: Number(Schedule.quantity) * Number(Schedule.partWeight),
        partWeight: Schedule.partWeight,
        quantity: Schedule.quantity,
        scheduleMeltQuantity: Schedule.quantity,
        status: "ON",
        createdOn: date
    });
    ongoingmelt
        .save()
        .then(doc3 => {
            var ongoingmelts = doc3;
            /** Save Melt Report in Melt Report Controller */
            MeltReportController.melt_report_save(req, res, ongoingmelts, melt);
             /** Save Core Making Details*/
             CoreMakingController.save_core_making(req, res, ongoingmelts, melt).then(result =>{
  /** Save Molding in Molding Controller */
  MoldingController.save_moulding(req, res, ongoingmelts, melt);
             })          
            /** Update Status in Schedule  Controller in status Deactive*/
            ScheduleController.update_schedule_status_id(req, res, scheduledId);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}

exports.get_ongoing_melt_all = (req, res, next) => {
    OnGoingMelt.find()
        .populate({ path: "meltId", select: "meltNo" })
        .select("orderId")
        .select("customerName")
        .select("batchId")
        .select("partId")
        .select("deliveryDate")
        .select("quantity")
        .select("meltWeight")
        .exec()
        .then(result => {
            var report = [
                {
                    customerName: "",
                    meltNo: "",
                    batchId: "",
                    partId: "",
                    meltWeight: 0,
                    deliveryDate: undefined
                }
            ];
            var i = 0;
            result.forEach(element => {
                report[i].meltNo = element.meltId.meltNo;
                report[i].batchId = element.batchId;
                report[i].partId = element.partId;
                report[i].meltWeight = element.meltWeight;
                report[i].deliveryDate = element.deliveryDate;
                report[i].customerName = element.customerName;
                report.push({
                    customerName: "",
                    meltNo: "",
                    batchId: "",
                    partId: "",
                    meltWeight: "",
                    deliveryDate: undefined
                });
                i++;
            });
            report.pop();
            let data = JSON.stringify(report);
            fs.writeFileSync("./uploads/customer.json", data);
            res.status(200).json(report);
        })
        .catch(err => {
            res.status(500).json({
                message: "There is an Error"
            });
        });
};
//
exports.get_partId_by_customer_name = (req, res) => {
    OnGoingMelt.find({ customerName: req.params.customerName })
        .populate("meltId")
        .exec()
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};

exports.get_ongoing_melt_by_melt_report = (req, res) => {
    const customerName = req.body.customerName;
    const partId = req.body.partId;
    const orderId = req.body.orderId;
    if (orderId == undefined) {
        if (customerName != undefined && partId != undefined) {
            OnGoingMelt.find({
                $and: [{ customerName: customerName }, { partId: partId }]
            })
                .populate("meltId")
                .exec()
                .then(docs => {
                    res.status(200).json(docs);
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    });
                });
        } else if (customerName == undefined && partId != undefined) {
            OnGoingMelt.find({ partId: partId })
                .populate("meltId")
                .exec()
                .then(docs => {
                    res.status(200).json(docs);
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    });
                });
        } else if (customerName != undefined && partId == undefined) {
            OnGoingMelt.find({ customerName: customerName })
                .populate("meltId")
                .exec()
                .then(docs => {
                    res.status(200).json(docs);
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    });
                });
        }
    } else if (orderId != undefined) {
        if (orderId != undefined && partId != undefined) {
            OnGoingMelt.find({ $and: [{ orderId: orderId }, { partId: partId }] })
                .populate("meltId")
                .exec()
                .then(docs => {
                    res.status(200).json(docs);
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    });
                });
        } else if (orderId == undefined && partId != undefined) {
            OnGoingMelt.find({ partId: partId })
                .populate("meltId")
                .exec()
                .then(docs => {
                    res.status(200).json(docs);
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    });
                });
        } else if (orderId != undefined && partId == undefined) {
            OnGoingMelt.find({ orderId: orderId })
                .populate("meltId")
                .exec()
                .then(docs => {
                    res.status(200).json(docs);
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    });
                });
        }
    }
};

/* getting data from ongoing  using batchId */

async function ongoing_melt_find_batch_status(batchId) {
    console.log("ongoing find called");
    var onGoingMeltData;
    var data = await OnGoingMelt.findOne({ batchId: batchId })
        .exec()
        .then(doc => {
            onGoingMeltData = doc;
            return onGoingMeltData;
        });
    return onGoingMeltData;
}

async function find_batchId(id) {
    var batch;
    await OnGoingMelt.findOne({ meltId: id })
        .exec()
        .then(doc => {
            batch = doc;
        });
    return batch;
}



/*  find OnGoing melt with batch Id*/
async function find_with_batch_id(batchId) {
    var ss = await OnGoingMelt.findOne({ 'batchId': batchId })
        .exec();
    return ss;
}

async function get_all_ongoing_melt(batchId) {
    await OnGoingMelt.findOne({ 'batchId': batchId })
        .populate('meltId')
        .populate('rawmaterialconsumption')
        .populate('moulding')
        .populate('knockout')
        .populate('shotblasting')
        .populate('painting')
        .populate('meltId')
        .exec()
        .then(doc => {
            console.log(doc);
        })
        .catch((err) => {
            res.status(500).json({
                error: err
            })
        })

}

module.exports.get_all_ongoing_melt = get_all_ongoing_melt;
module.exports.find_batchId = find_batchId;
module.exports.find_with_batch_id = find_with_batch_id;
module.exports.ongoing_melt_find_batch_status = ongoing_melt_find_batch_status;
