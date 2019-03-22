const McConsumableStock = require('../model/mc-consumable-stock');
const mongoose = require('mongoose');
const PurchaseController = require('../controller/purchase');
const PurchaseReportController = require('../controller/purchase-report');
const McConsumableTempStockController = require('../controller/mc-consumable-temp-stock');

/**get all stock list */
exports.mc_consumable_stock_get_all = (req, res, next) => {
    McConsumableStock.find()
        .exec()
        .then(doc => {
            res.status(200).json(doc)
        }).catch(err => {
            res.status(500).json({
                error: err
            })
        })
}

exports.get_skock_by_itemName=(req,res) => {
    McConsumableStock.findOne({ 'itemName': req.params. itemName })
    .then(doc => {
        res.status(200).json(doc);
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    });
}

/** find a particular item  */
async function mc_consumable_stock_find_item(req, res) {
    if (req.body.stockType === 'STOCK') {
        itemName = req.body.items.itemName;
    } else {
        itemName = req.body.itemName;
    }
    var stockRes;
    var s = await McConsumableStock.find({ 'itemName': itemName })
        .then(doc => {
            stockRes = doc;
        }).catch(err => {
            res.status(500).json({
                error: err
            });
        });
    return stockRes;
}

/** move from mcConsumableTempstock to mcConsumableStock */
exports.mc_consumable_stock_move = (req, res, next) => {
    mc_consumable_stock_find_item(req, res)
    .then(doc => {
        if (doc.length >= 1) {
            doc.forEach(res => {
                id = res._id;
                resWeight = res.weight;
                resMinWeight = res.minOrderWeight;
                resMaxWeight = res.maxOrderWeight;
                resPerKG = res.perKG;
            })
            if (req.body.unit == 'CFT') {
                reqWeight = Number(req.body.weight) * Number(68.15);
            } else {
                reqWeight = req.body.weight;
            }

            if (resMinWeight < reqWeight) {
                updatedMinOrderWeight = resMinWeight;
            } else {
                updatedMinOrderWeight = reqWeight;
            }

            if (resMaxWeight > reqWeight) {
                updatedMaxOrderWeight = resMaxWeight;
            } else {
                updatedMaxOrderWeight = reqWeight;
            }
            const updatedWeight = resWeight + Number(reqWeight);
            const newTotalAmount = Number(resWeight) * Number(resPerKG);
            const updatedTotalAmount = Number(newTotalAmount) + Number(req.body.totalAmount);
            const perKG = Number(updatedTotalAmount) / Number(updatedWeight);

            /**update the old item in stock */
            mc_consumable_stock_item_update(req, res, id, updatedWeight, updatedMinOrderWeight, updatedMaxOrderWeight, perKG, updatedTotalAmount)
                .then(doc => {
                    /** temp table delete */
                    McConsumableTempStockController.mc_consumable_temp_delete(req, res)
                        .then(doc => {
                            console.log('deleted');
                            res.status(200).json(doc);
                        })
                })
        } else {
            /** new item save in stock */
            mc_consumable_stock_save(req, res)
                .then(doc => {
                    /** temp table delete */
                    McConsumableTempStockController.mc_consumable_temp_delete(req, res)
                        .then(doc => {
                            console.log('deleted');
                            res.status(200).json(doc);
                        })  }) } })
}

async function mc_consumable_stock_item_update(req, res, id, updatedWeight, updatedMinOrderWeight, updatedMaxOrderWeight, perKG,
    updatedTotalAmount) {
        var update;
    if (req.body.stockType === 'STOCK') {
        purchaseID = req.body._id,
            lastOrderDate = req.body.deliveryDate;
    } else {
        purchaseID = req.body.purchaseId;
        lastOrderDate = req.body.lastOrder;
    }
     await McConsumableStock.findByIdAndUpdate({ _id: id }, {
        $set: {
            weight: updatedWeight.toFixed(1),
            minOrderWeight: updatedMinOrderWeight,
            maxOrderWeight: updatedMaxOrderWeight,
            perKG: perKG.toFixed(1),
            totalAmount: updatedTotalAmount.toFixed(1),
            purchaseId: purchaseID,
            lastOrder: lastOrderDate
        }
    })
        .then(doc => {
            update = doc;
        }).catch(err => {
            res.status(500).json({
                error: err
            });
        });
    return update;
}

async function mc_consumable_stock_save(req,res){
    console.log('req',req.body)
    if (req.body.unit == 'CFT') {
        updatedWeight = Number(req.body.weight) * Number(68.15);
    } else {
        updatedWeight = req.body.weight;
    }
    const perKG = Number(req.body.totalAmount) / Number(updatedWeight);
    var stockRes;
    const mcConsumableStock = new McConsumableStock({
        _id: new mongoose.Types.ObjectId(),
        itemName: req.body.itemName,
        itemType: req.body.itemType,
        weight: updatedWeight.toFixed(1),
        unit: req.body.unit,
        perKG: perKG.toFixed(1),
        totalAmount: req.body.totalAmount.toFixed(1),
        averageWeight: 0,
        minWeightReq: req.body.minWeightReq,
        minOrderWeight: updatedWeight.toFixed(1),
        maxOrderWeight: updatedWeight.toFixed(1),
        lastOrder: req.body.lastOrder,
        deliveredTime: req.body.deliveredTime,
        purchaseId: req.body.purchaseId
    });
    var s = await mcConsumableStock.save()
        .then(doc => {
            stockRes = doc;
        }).catch(err => {
            res.status(500).json({
                error: err
            });
        });
    return stockRes;
}

/** find and upadte the item in stock*/
async function mc_cons_stock_find_item(req, res, purchaseRes) {
    var stockRes;
    var s = await McConsumableStock.findOne({ 'itemName': req.body.items.itemName })
        .exec()
        .then(stockRes => {
            if (purchaseRes.items.unit == 'CFT') {
                purchaseWeight = Number(purchaseRes.weight) * Number(68.15);

            } else {
                purchaseWeight = purchaseRes.weight;
            }
            const stockMinWeight = stockRes.minOrderWeight;
            const stockMaxWeight = stockRes.maxOrderWeight;

            if (req.body.items.unit == 'CFT') {
                reqWeight = Number(req.body.weight) * Number(68.15);
            } else {
                reqWeight = req.body.weight;
            }

            if (purchaseWeight < reqWeight) {
                newWeight = reqWeight - Number(purchaseWeight);
                updatedWeight = stockRes.Weight + Number(newWeight)
            } else {
                newWeight = purchaseWeight - Number(reqWeight);
                updatedWeight = stockRes.weight - Number(newWeight)
            }

            if (stockMinWeight < reqWeight) {
                updatedMinWeight = stockMinWeight;
            } else {
                updatedMinWeight = reqWeight;
            }

            if (stockMaxWeight < reqWeight) {
                updatedMaxWeight = reqWeight;
            } else {
                updatedMaxWeight = stockMaxWeight;
            }
            const stockTotalAmount = Number(stockRes.weight) * Number(stockRes.perKG);
            const x = Number(stockTotalAmount) - Number(purchaseRes.totalAmount);                 
            const updatedTotalamount = Number(x) + Number(req.body.totalAmount);
            const perKG = Number(updatedTotalamount) / Number(updatedWeight);
            /**stock table updation */
            mc_consumable_stock_item_update(req, res, stockRes, updatedWeight, updatedMinWeight, updatedMaxWeight, perKG, updatedTotalamount)
                .then(doc => {
                    /**purchase update */
                    PurchaseController.purchase_update_one(req, res)
                        .then(doc1 => {
                            /**purchaseReport update */
                            PurchaseReportController.purchase_report_update(req, res, doc1)
                                .then(doc => {
                                })
                        })
                })
        })
}
/**directly save stock table */
async function mc_cons_stock_save_directly(req, res,doc1) {
    req.body._id=doc1._id;
    /** find and update the particular item */
     await mc_consumable_stock_find_item(req, res)
        .then(doc => {
            if (doc.length >= 1) {
                doc.forEach(res => {
                    id = res._id;
                    resWeight = res.weight;
                    resMinWeight = res.minOrderWeight;
                    resMaxWeight = res.maxOrderWeight;
                    resPerKG = res.perKG;
                })
                if (req.body.items.unit == 'CFT') {
                    reqWeight = Number(req.body.weight) * Number(68.15);
                } else {
                    reqWeight = req.body.weight;
                }
                if (resMinWeight < reqWeight) {
                    updatedMinOrderWeight = resMinWeight;
                } else {
                    updatedMinOrderWeight = reqWeight;
                }

                if (resMaxWeight > reqWeight) {
                    updatedMaxOrderWeight = resMaxWeight;
                } else {
                    updatedMaxOrderWeight = reqWeight;
                }
                const updatedWeight = resWeight + Number(reqWeight);
                const newTotalAmount = Number(resWeight) * Number(resPerKG);
                const updatedTotalAmount = Number(newTotalAmount) + Number(req.body.totalAmount);
                const perKG = Number(updatedTotalAmount) / Number(updatedWeight);
                /**update the old item in stock */
                mc_consumable_stock_item_update(req, res, id, updatedWeight, updatedMinOrderWeight, updatedMaxOrderWeight, perKG, updatedTotalAmount,doc1)
                    .then(doc => {
                        res.status(200).json(doc);
                    })
            } else {
                /** new item save in stock */
                mc_cons_stock_directly_save(req, res)
                    .then(doc => {
                        res.status(200).json(doc);
                    })
            }
        });
}
async function mc_cons_stock_directly_save(req, res) {
    if (req.body.items.unit == 'CFT') {
        updatedWeight = Number(req.body.weight) * Number(68.15);
    } else {
        updatedWeight = req.body.weight;
    }
    const perKG = Number(req.body.totalAmount) / Number(updatedWeight);
    var stockRes;
    const mcConsumableStock = new McConsumableStock({
        _id: new mongoose.Types.ObjectId(),
        itemName: req.body.items.itemName,
        itemType: req.body.items.itemType,
        weight: updatedWeight,
        unit: req.body.items.unit,
        perKG: perKG.toFixed(1),
        totalAmount: req.body.totalAmount,
        averageWeight: 0,
        minWeightReq: req.body.items.minWeightReq,
        minOrderWeight: updatedWeight,
        maxOrderWeight: updatedWeight,
        lastOrder: req.body.deliveryDate,
        deliveredTime: req.body.deliveredTime,
        purchaseId: req.body._id
    });
    var s = await mcConsumableStock.save()
        .then(doc => {
            stockRes = doc;
        }).catch(err => {
            res.status(500).json({
                error: err
            });
        });
    return stockRes;
}
module.exports.mc_cons_stock_find_item=mc_cons_stock_find_item;
module.exports.mc_cons_stock_save_directly=mc_cons_stock_save_directly;
module.exports.mc_consumable_stock_find_item=mc_consumable_stock_find_item;