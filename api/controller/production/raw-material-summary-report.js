/* 
module name: Production(Report)
sub-module name: RawMaterialSummary Report
*/ 

/* import module */
const mongoose = require('mongoose');
const dateFormat = require('dateformat');
const dateTime = require('node-datetime');

/** model */
const RawMaterialSummaryReport = require('../../model/production/raw-material-summary-report');

/* get RawMaterial Summary Report */
exports.raw_material_summary_report_all = (req, res) => {
    RawMaterialSummaryReport.find()
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


/* filtering report */
exports.raw_material_summary_report = (req, res) => {
   
    if (req.body.meltNo) {
        RawMaterialSummaryReport.find()
            .where('meltNo')
            .equals(req.body.meltNo)
            .exec()
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(200).json(err);
            });

    } else if (req.body.reportType === 'YEARLY') {
        RawMaterialSummaryReport
            .aggregate([
                {
                    $match: {
                        itemName: req.body.itemName
                    }
                },
                {
                    $group: {
                        _id: { itemName: "$itemName", year: "$year" }, num: { $sum: 1 }, weight: { $sum: "$weight" },
                    }
                },
                {
                    $project: {
                        itemName: "$_id.itemName",
                        weight: "$weight",
                        number: "$num",
                        year: "$_id.year"
                    }
                },

                { "$sort": { year: 1 } }])

            .exec()
            .then(doc => {
                res.status(200).json(doc);
            })
            .catch(err => {
                res.status(200).json(err);
            });
    }

    else if (req.body.reportType === 'MONTHLY' && req.body.year != undefined) {
        RawMaterialSummaryReport.aggregate([
            {
                $match: {
                    $and: [
                        { itemName: req.body.itemName },
                        { year: req.body.year }
                    ]
                }
            },
            {
                $group: {
                    _id: { itemName: "$itemName", monthly: "$mon" }, num: { $sum: 1 }, weight: { $sum: "$weight" },
                    year: { $first: "$year" }, month: { $first: "$month" }
                }
            },
            {
                $project: {
                    itemName: "$_id.itemName",
                    weight: "$weight",
                    number: "$num",
                    year: "$year",
                    monthly: "$_id.monthly",
                    month: "$month",
                }
            },

            { "$sort": { monthly: 1 } }])

            .exec()
            .then(doc => {
                res.status(200).json(doc);

            })
            .catch(err => {
                res.status(200).json(err);
            });
    }
    else if (req.body.reportType === 'CUSTOMIZE' && req.body.fromDate != undefined && req.body.toDate != undefined) {

        RawMaterialSummaryReport.find({
            $and: [{ itemName: req.body.itemName }, {
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
                res.status(200).json(err);
            });
    }
}


/* get all years */
exports.get_year = (req, res) => {
    RawMaterialSummaryReport.distinct('year')
        .exec()
        .then(docs => {
            console.log('year', docs);
            res.status(200).json(docs);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        })
}


/* find the RawMaterial Summary Report using meltno */
async function find_raw_material_summary(meltNo) {
    var rawMaterial;
    const ss = await RawMaterialSummaryReport.find()
        .where('meltNo')
        .equals(meltNo)
        .exec()
        .then(result => {
            rawMaterial = result;
        })
        .catch(err => {
            res.status(200).json(err);
        });
    return rawMaterial;
}


/* save raw material summary report*/
async function save_raw_material_summary(req,res,docs,meltNo,result) {

    var dt = dateTime.create();
    var date = dt.format('Y-m-d H:M:S');
    const meltDate = docs.meltDate.substring(0, 10);
    const meltdateMonth = dateFormat(meltDate, 'mmmm');
    const meltMonth = meltdateMonth.substring(0, 3);
    /* RawMaterial Summary Report Save */
    const rawMaterialSummaryReport = new RawMaterialSummaryReport({
        _id: new mongoose.Types.ObjectId(),
        meltDate: docs.meltDate,
        meltNo: meltNo,
        itemName: result.itemName,
        weight: result.itemWeight,
        date: docs.meltDate.substring(8, 10),
        month: docs.meltDate.substring(5, 7),
        year: docs.meltDate.substring(0, 4),
        mon: meltMonth,
        createdOn: date,
        createdBy: req.body.createdBy
    });
    rawMaterialSummaryReport.save()
        .then(result => {
        })
        .catch(err => {
            res.status(500).json(err);
        });
}

module.exports.find_raw_material_summary = find_raw_material_summary;
module.exports.save_raw_material_summary = save_raw_material_summary;