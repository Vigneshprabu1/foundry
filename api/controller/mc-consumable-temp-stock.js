const mongoose = require('mongoose');
const McConsumableTempStock = require('../model/mc-consumable-temp-stock');


/** get all temp stock list  */
exports.mc_consumable_temp_stock_get = (req, res, next) => {
    McConsumableTempStock.find()
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
async function mc_consumable_temp_stock_save(req, res, doc1) {
    var temp;
    const mcConsumableTempStock = new McConsumableTempStock({
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
    var s = await mcConsumableTempStock.save()
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
async function mc_consumable_temp_delete(req, res) {
    var temp;
    var s = await McConsumableTempStock.findByIdAndRemove({ _id: req.body._id })
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

async function mc_cons_temp_stock_find_one(req, res) {
    var temp;
    const s = await McConsumableTempStock.findOne({ 'purchaseId': req.body._id })
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
async function mc_cons_temp_stock_update(req, res, doc) {
    var temp;
    var s = await McConsumableTempStock.findByIdAndUpdate({ _id: doc._id }, {
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
module.exports.mc_consumable_temp_delete = mc_consumable_temp_delete;
module.exports.mc_consumable_temp_stock_save = mc_consumable_temp_stock_save;
module.exports.mc_cons_temp_stock_update = mc_cons_temp_stock_update;
module.exports.mc_cons_temp_stock_find_one = mc_cons_temp_stock_find_one;