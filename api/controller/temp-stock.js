const mongoose = require('mongoose');
const TempStock = require('../model/temp-stock');

/** get all temp stock list  */
exports.tempStock_get = (req, res, next) => {
    TempStock.find()
        .exec()
        .then(doc => {
            res.status(200).json(doc)
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}

/**tempStock save function */
async function temp_stock_save(req, res, doc1) {
    var temp;
    const tempStock = new TempStock({
        _id: new mongoose.Types.ObjectId(),
        itemName: req.body.items.itemName,
        itemType: req.body.items.itemType,
        weight: req.body.weight,
        unit: req.body.items.unit,
        minWeightReq:req.body.items.minWeightReq,
        totalAmount: req.body.totalAmount,
        vendorName: req.body.vendor.vendorName,
        invoiceNo: req.body.invoiceNo,
        orderDate: req.body.orderDate,
        deliveryDate: req.body.deliveryDate,
        deliveryTime: req.body.deliveryTime,
        deliveredTime: req.body.deliveredTime,
        purchaseId: doc1._id
    });
    var s = await tempStock.save()
        .then(doc => {
            temp = doc;
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
    return temp;
}

async function temp_stock_find_one(req, res) {
    var temp;
    const s = await TempStock.findOne({ 'purchaseId': req.body._id })
        .exec()
        .then(doc => {
            temp = doc;
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
    return temp;
}

/** temp Stock update */
async function temp_stock_update(req, res, doc) {
    var temp;
    var s = await TempStock.findByIdAndUpdate({ _id: doc._id }, {
        $set: {
            itemName: req.body.items.itemName,
            itemType: req.body.items.itemType,
            weight: req.body.weight,
            unit: req.body.items.unit,
            minWeightReq:req.body.items.minWeightReq,
            totalAmount: req.body.totalAmount,
            vendorName: req.body.vendor.vendorName,
            invoiceNo: req.body.invoiceNo,
            orderDate: req.body.orderDate,
            deliveryDate: req.body.deliveryDate,
            deliveryTime: req.body.deliveryTime,
            purchaseId: req.body._id
        }
    })
        .exec()
        .then(doc => {
            temp = doc;
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
    return temp;
}

/** temp table delete */
async function temp_table_delete(req, res) {
    var temp;
    var s = await TempStock.findByIdAndRemove({ _id: req.body._id })
        .exec()
        .then(doc => {
            temp = doc;
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
    return temp;
}
module.exports.temp_stock_save = temp_stock_save;
module.exports.temp_stock_find_one = temp_stock_find_one;
module.exports.temp_stock_update = temp_stock_update;
module.exports.temp_table_delete = temp_table_delete;