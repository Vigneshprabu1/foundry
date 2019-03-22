const mongoose = require('mongoose');
const PurchaseReport = require('../model/purchase-report');
var request = require('request');
const dateTime = require('node-datetime');
/** get all purchase reports */
exports.get_purchase_all = (req, res, next) => {
    PurchaseReport.find()
        .then(doc => {
            res.status(200).json(doc)
        })
        .catch(error => {
            res.status(500).json({
                error: err
            });
        });
}

/** get the purchase report based on monthly/yearly/customize */
exports.get_purchase_report = (req, res, next) => {

    if (req.body.reportType === 'YEARLY') {
        PurchaseReport.aggregate([
            {
                $group: {
                    _id: { itemName: "$itemName", year: "$year" }, num: { $sum: 1 }, weight: { $sum: "$weight" }, totalAmount: { $sum: "$totalAmount" },
                }
            },
            {
                $project: {
                    itemName: "$_id.itemName",
                    weight: "$weight",
                    number: "$num",
                    totalAmount: "$totalAmount",
                    year: "$_id.year"
                }
            },
            { "$sort": { year: 1 } }])
            .exec()
            .then(doc => {
                res.status(200).json(doc)
            }).catch(error => {
                res.status(500).json({
                    error: err
                });
            });
    } else if (req.body.reportType === 'MONTHLY' && req.body.year != undefined) {
        PurchaseReport.aggregate([
            {
                $match: {
                    year: req.body.year
                }
            },
            {
                $group: {
                    _id: { itemName: "$itemName", month: "$month" }, num: { $sum: 1 }, weight: { $sum: "$weight" }, totalAmount: { $sum: "$totalAmount" },
                    year: { $first: "$year" }, itemType: { $first: "$itemType" }, monthly: { $first: "$monthly" }
                }
            },
            {
                $project: {
                    itemName: "$_id.itemName",
                    weight: "$weight",
                    number: "$num",
                    totalAmount: "$totalAmount",
                    year: "$year",
                    itemType: "$itemType",
                    month: "$_id.month",
                    monthly: "$monthly"
                }
            },

            { "$sort": { month: 1 } }])

            .exec()
            .then(doc => {
                res.status(200).json(doc);

            })
            .catch(error => {
                res.status(500).json({
                    error: err
                });
            });
    } else if (req.body.reportType === 'CUSTOMIZE' && req.body.fromDate != undefined && req.body.toDate != undefined) {
        PurchaseReport.find({ 'orderDate': { "$gte": req.body.fromDate, "$lt": req.body.toDate } })
            .exec()
            .then(doc => {
                res.status(200).json(doc);

            })
            .catch(error => {
                res.status(500).json({
                    error: err
                });
            });
    }
}

/** get the purchase report based on vendorwise */
exports.get_purchase_vendorWise_report = (req, res, next) => {

    if (req.body.reportType == 'YEARLY' && req.body.vendorName != undefined) {
        PurchaseReport.aggregate([
            {
                $match: {
                    vendorName: req.body.vendorName
                }
            },
            {
                $group: {
                    _id: { vendorName: "$vendorName", year: "$year" }, num: { $sum: 1 }, weight: { $sum: "$weight" }, totalAmount: { $sum: "$totalAmount" },
                    itemName: { $first: "$itemName" }, year: { $first: "$year" }
                }
            },
            {
                $project: {
                    vendorName: "$_id.vendorName",
                    weight: "$weight",
                    number: "$num",
                    totalAmount: "$totalAmount",
                    itemName: "$itemName",
                    year: "$year"
                }
            },

            { "$sort": { year: 1 } }
        ])
            .exec()
            .then(doc => {
                res.status(200).json(doc)
            })
            .catch(error => {
                res.status(500).json({
                    error: err
                });
            });
    } else if (req.body.reportType == 'MONTHLY' && req.body.vendorName != undefined && req.body.year != undefined) {

        PurchaseReport.aggregate([
            {
                $match: {
                    year: req.body.year,
                    vendorName: req.body.vendorName,
                }
            },
            {
                $group: {
                    _id: { vendorName: "$vendorName", month: "$month" }, num: { $sum: 1 }, weight: { $sum: "$weight" }, totalAmount: { $sum: "$totalAmount" },
                    itemName: { $first: "$itemName" }, monthly: { $first: "$monthly" }, year: { $first: "$year" }
                }
            },
            {
                $project: {
                    vendorName: "$_id.vendorName",
                    weight: "$weight",
                    number: "$num",
                    totalAmount: "$totalAmount",
                    itemName: "$itemName",
                    monthly: "$monthly",
                    month: "_id.$month",
                    year: "$year"
                }
            },
            { "$sort": { month: 1 } }
        ])
            .exec()
            .then(doc => {
                res.status(200).json(doc)
            })
            .catch(error => {
                res.status(500).json({
                    error: err
                });
            });
    } else if (req.body.reportType == 'CUSTOMIZE' && req.body.vendorName != undefined && req.body.fromDate != undefined && req.body.toDate != undefined) {
        PurchaseReport.find({
            $and: [{ vendorName: req.body.vendorName }, { 'orderDate': { "$gte": req.body.fromDate, "$lt": req.body.toDate } }]
        })
            .exec()
            .then(doc => {
                res.status(200).json(doc);

            })
            .catch(error => {
                res.status(500).json({
                    error: err
                });
            });
    }
}

/** get all purchase years  */
exports.get_purchase_years = (req, res, next) => {
    PurchaseReport.distinct('year')
        .exec()
        .then(doc => {
            res.status(200).json(doc)
        })
        .catch(error => {
            res.status(500).json({
                error: err
            });
        });
}

/** purchase report save */
async function purchase_report_save(req, res, doc1) {
    if (req.body.items.unit == 'CFT') {
        reqWeight = Number(req.body.weight) * Number(68.15);
        reqWeight = reqWeight.toFixed(2);
    } else {
        reqWeight = req.body.weight;
    }
    const dt = dateTime.create();
    const orderMonth = dt.format('Y-f-d');
    var report;
    const purchaseReport = new PurchaseReport({
        _id: new mongoose.Types.ObjectId(),
        invoiceNo: req.body.invoiceNo,
        invoiceDate: req.body.invoiceDate,
        weight: reqWeight,
        unit:req.body.items.unit,
        totalAmount: req.body.totalAmount,
        gstValue: req.body.gstValue,
        deliveryTime: req.body.deliveredTime,
        deliveryDate: req.body.deliveryDate,
        orderDate: req.body.orderDate,
        stockNo: doc1.stockNo,
        itemName: req.body.items.itemName,
        itemType: req.body.items.itemType,
        vendorName: req.body.vendor.vendorName,
        vendorType: req.body.items.itemType,
        stockType:req.body.items.stockType,
        date: req.body.orderDate.substring(8, 10),
        month: req.body.orderDate.substring(5, 7),
        monthly: orderMonth.substring(5, 8),
        year: req.body.orderDate.substring(0, 4)
    });
    var s = await purchaseReport.save()
        .then(purchaseRes => {
            report = purchaseRes;
        })
        .catch(error => {
            res.status(500).json({
                error: err
            });
        });
    return report;
}

/**purchase report update */
async function purchase_report_update(req, res, doc1) {
    if (req.body.items.unit == 'CFT') {
        reqWeight = Number(req.body.weight) * Number(68.15);
        reqWeight = reqWeight.toFixed(2);
    } else {
        reqWeight = req.body.weight;
    }
    const dt = dateTime.create();
    const orderMonth = dt.format('Y-f-d');
    var report;
    var s = await PurchaseReport.updateOne({ 'stockNo': doc1.stockNo }, {
        $set: {
            invoiceNo: req.body.invoiceNo,
            invoiceDate: req.body.invoiceDate,
            weight: reqWeight,
            unit:req.body.items.unit,
            gstValue: req.body.gstValue,
            totalAmount: req.body.totalAmount,
            deliveryTime: req.body.deliveredTime,
            deliveryDate: req.body.deliveryDate,
            orderDate: req.body.orderDate,
            stockNo: doc1.stockNo,
            itemName: req.body.items.itemName,
            itemType: req.body.items.itemType,
            vendorName: req.body.vendor.vendorName,
            vendorType: req.body.items.itemType,
            stockType:req.body.items.stockType,
            date: req.body.orderDate.substring(8, 10),
            month: req.body.orderDate.substring(5, 7),
            monthly: orderMonth.substring(5, 8),
            year: req.body.orderDate.substring(0, 4)
        }
    })
        .exec()
        .then(doc => {
            report = doc;
        })
        .catch(error => {
            res.status(500).json({
                error: err
            });
        });
    return report;
}

exports.get_purchase_report_all_ptf = (req, res) => {
    var data = {
        template: { 'shortid': 'BkR6rQdmE' },
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
exports.get_purchase_report_all_xlsx = (req, res) => {

    var data = {
        template: { 'shortid': 'HyARB7_7E' },
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
module.exports.purchase_report_save = purchase_report_save;
module.exports.purchase_report_update = purchase_report_update;