const Purchase = require('../model/purchase');
const mongoose = require('mongoose');
const dateTime = require('node-datetime');
const PurchaseReportController = require('../controller/purchase-report');
const TempStockController = require('../controller/temp-stock');
const VendorController = require('../controller/vendor');
const MailController = require('../controller/mail');
const StockController = require('../controller/stock');
const McPartsTempStockController = require('../controller/mc-parts-temp-stock');
const McConsumableTempStockController = require('../controller/mc-consumable-temp-stock');
const McConsumableStockController = require('../controller/mc-consumable-stock');
const McPartsStockController = require('../controller/mc-parts-stock');

/**get emmpty invoice in purchase */
exports.purchase_empty_invoice = (req, res, next) => {
    Purchase.find({
        $or: [{ 'invoiceNo': 0 }, { 'invoiceNo': null }]
    })
        .populate('vendor')
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
/** get all purchase list */
exports.purchase_get_all = (req, res, next) => {
    Purchase.find()
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

/**purchase save */
async function save_purchase(req, res) {
    const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S');
    // const name = req.body.items.itemName.replace(/\s/g, "");
    const stockDate = req.body.orderDate.substring(8, 10) + req.body.orderDate.substring(5, 7) + req.body.orderDate.substring(2, 4);
    stockName = req.body.items.itemName.substring(0, 2).toUpperCase();
    var purchaseRes;
    const purchase = new Purchase({
        _id: new mongoose.Types.ObjectId(),
        invoiceNo: req.body.invoiceNo,
        invoiceDate: req.body.invoiceDate,
        transportCost: req.body.transportCost,
        weight: req.body.weight,
        gstValue: req.body.gstValue,
        totalAmount: req.body.totalAmount,
        deliveryDate: req.body.deliveryDate,
        deliveryTime: req.body.deliveryTime,
        orderDate: req.body.orderDate,
        stockNo: stockName + req.body.vendor.vendorCode + stockDate,
        createdOn: date,
        createdBy: req.body.createdBy,
        items: req.body.items,
        vendor: req.body.vendor
    });
    var s = await purchase.save()
        .then(doc => {
            purchaseRes = doc;
        })
        .catch(err => {
            res.status(500).json({
                err: error
            });
        });
    return purchaseRes;
}

/** find a particular invoiceNo */
async function purchase_find_invoice(invoiceNo) {
    var invoice;
    const purchase = await Purchase.findOne({ 'invoiceNo': invoiceNo })
        .exec()
        .then(doc => {
            invoice = doc;
        })
        .catch(err => {
            res.status(500).json({
                err: error
            });
        });
    return invoice;
}

/**Purchase find One */
async function purchase_find_one(req, res) {
    var purchaseRes;
    var s = await Purchase.findOne({ _id: req.body._id })
        .populate('items')
        .populate('vendors')
        .exec()
        .then(doc => {
            purchaseRes = doc;
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
    return purchaseRes;
}

/**purchase update */
async function purchase_update_one(req, res) {
    const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S');
    const stockDate = req.body.orderDate.substring(8, 10) + req.body.orderDate.substring(5, 7) + req.body.orderDate.substring(2, 4);
    stockName = req.body.items.itemName.substring(0, 2).toUpperCase();
    var purchase;
    var s = await Purchase.findByIdAndUpdate({ _id: req.body._id }, {
        $set: {
            invoiceNo: req.body.invoiceNo,
            invoiceDate: req.body.invoiceDate,
            transportCost: req.body.transportCost,
            weight: req.body.weight,
            gstValue: req.body.gstValue,
            totalAmount: req.body.totalAmount,
            deliveryDate: req.body.deliveryDate,
            deliveryTime: req.body.deliveryTime,
            orderDate: req.body.orderDate,
            stockNo: stockName + req.body.vendor.vendorCode + stockDate,
            items: req.body.items._id,
            vendor: req.body.vendor._id,
            modifiedOn: date,
            modifiedBy: req.body.modifiedBy
        }
    })
        .then(doc => {
            purchase = doc;
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
    return purchase;
}

/** purchase save function */
exports.purchase_save = (req, res, next) => {
    /**check the invoiceNo already entered or not  */
    purchase_find_invoice(req.body.invoiceNo)
        .then(doc => {
            if (!doc || doc.invoiceNo == null || doc.invoiceNo == 0) {
                if (!req.body.vendor._id) {
                    /**vendor master save */
                    VendorController.vendor_save(req, res)
                        .then(doc => {
                            req.body.vendor._id = doc._id;
                            req.body.vendor.vendorCode = doc.vendorCode;
                            // if (req.body.items._id && req.body.vendor._id) {}
                            /**purchase save */
                            save_purchase(req, res)
                                .then(doc1 => {
                                    /**send mail to vendor */
                                    MailController.mail_send(req);
                                    /**purchase report save */
                                    PurchaseReportController.purchase_report_save(req, res, doc1)
                                        .then(doc => {
                                            if (req.body.stock === 'STOCK') {
                                                if (req.body.items.stockType === 'SK') {
                                                    StockController.stock_save_directly(req, res, doc1);
                                                } else if (req.body.items.stockType === 'MCS') {
                                                    McConsumableStockController.mc_cons_stock_save_directly(req, res, doc1);
                                                } else if (req.body.items.stockType === 'MPS') {
                                                    McPartsStockController.mc_parts_stock_save_directly(req, res, doc1);
                                                }
                                            } else {
                                                /**temp stock save */
                                                if (req.body.items.stockType === 'SK') {
                                                    TempStockController.temp_stock_save(req, res, doc1)
                                                        .then(doc => {
                                                            res.status(200).json(doc);
                                                        })
                                                } else if (req.body.items.stockType === 'MCS') {
                                                    McConsumableTempStockController.mc_consumable_temp_stock_save(req, res, doc1)
                                                        .then(doc => {
                                                            res.status(200).json(doc);
                                                        })
                                                } else if (req.body.items.stockType === 'MPS') {
                                                    McPartsTempStockController.mc_parts_temp_stock_save(req, res, doc1)
                                                        .then(doc => {
                                                            res.status(200).json(doc);
                                                        })
                                                }
                                            }
                                        })
                                })
                        })
                } else {
                    /**purchase save */
                    save_purchase(req, res)
                        .then(doc1 => {
                            /**send mail to vendor */
                            MailController.mail_send(req);
                            /**purchase report save */
                            PurchaseReportController.purchase_report_save(req, res, doc1)
                                .then(doc => {
                                    /**temp stock save */
                                    if (req.body.stock === 'STOCK') {
                                        if (req.body.items.stockType === 'SK') {
                                            StockController.stock_save_directly(req, res, doc1);
                                        } else if (req.body.items.stockType === 'MCS') {
                                            McConsumableStockController.mc_cons_stock_save_directly(req, res, doc1);
                                        } else if (req.body.items.stockType === 'MPS') {
                                            McPartsStockController.mc_parts_stock_save_directly(req, res, doc1);
                                        }
                                    } else {
                                        /**temp stock save */
                                        if (req.body.items.stockType === 'SK') {
                                            TempStockController.temp_stock_save(req, res, doc1)
                                                .then(doc => {
                                                    res.status(200).json(doc);
                                                })
                                        } else if (req.body.items.stockType === 'MCS') {
                                            McConsumableTempStockController.mc_consumable_temp_stock_save(req, res, doc1)
                                                .then(doc => {
                                                    res.status(200).json(doc);
                                                })
                                        } else if (req.body.items.stockType === 'MPS') {
                                            McPartsTempStockController.mc_parts_temp_stock_save(req, res, doc1)
                                                .then(doc => {
                                                    res.status(200).json(doc);
                                                })
                                        }
                                    }
                                })
                        })
                }
            } else {
                res.status(200).json({
                    message: 'Invoice already exist'
                })
            }
        })
}

/** get the purcticular purchase */
exports.purchase_get_one = (req, res, next) => {
    Purchase.findById({ _id: req.params.purchaseId }, { invoiceNo: 0 })
        .populate('vendor')
        .populate('items')
        .exec()
        .then(doc => {
            res.status(200).json(doc)
        })
        .catch(err => {
            res.status(500).json({ error: err })
        });

}

/**purchase search for edit  */
exports.purchase_search_for_edit = (req, res, next) => {
    if (req.body.orderDate == null && req.body.invoiceNo == null  ) {
        Purchase.findOne({ 'stockNo': req.body.stockNo })
            .populate('items')
            .populate('vendor')
            .exec()
            .then(doc => {
                res.status(200).json(doc)
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                })
            })
    } else if (req.body.orderDate == null ) {
        Purchase.findOne({
             $or: [{ 'stockNo': req.body.stockNo }, { 'invoiceNo': req.body.invoiceNo }]
        })
            .populate('items')
            .populate('vendor')
            .exec()
            .then(doc => {
                res.status(200).json(doc)
            }) 
    }
     else {
        Purchase.findOne({
            $and: [{ $or: [{ 'stockNo': req.body.stockNo }, { 'invoiceNo': req.body.invoiceNo }] }, { 'orderDate': req.body.orderDate }]
        })
            .populate('items')
            .populate('vendor')
            .exec()
            .then(doc => {
                res.status(200).json(doc)
            })
    }
}
/** paurchase update function */
exports.purchase_update = (req, res, next) => {
    /** vendor master update */
    VendorController.vendor_update(req, res)
        .then(doc => {
            /**temp stock find One */
            if (req.body.items.stockType === 'SK') {
                TempStockController.temp_stock_find_one(req, res)
                    .then(doc => {
                        if (doc == null) {
                            /**Purchase find One */
                            purchase_find_one(req, res)
                                .then(purchaseRes => {
                                    /**  find a particular item in stock */
                                    StockController.stock_find_item(req, res, purchaseRes)
                                        .then(stockRes => {
                                            res.status(200).json(doc);
                                        })
                                })
                        } else {
                            /** temp stock update */
                            TempStockController.temp_stock_update(req, res, doc)
                                .then(doc => {
                                    /**purchase update */
                                    purchase_update_one(req, res)
                                        .then(doc1 => {
                                            /** purchase report updation */
                                            PurchaseReportController.purchase_report_update(req, res, doc1)
                                                .then(doc => {
                                                    res.status(200).json(doc);
                                                })
                                        })
                                })
                        }
                    })

            } else if (req.body.items.stockType === 'MCS') {
                McConsumableTempStockController.mc_cons_temp_stock_find_one(req, res)
                    .then(doc => {
                        if (doc == null) {
                            /**Purchase find One */
                            purchase_find_one(req, res)
                                .then(purchaseRes => {
                                    /**  find a particular item in stock */
                                    McConsumableStockController.mc_cons_stock_find_item(req, res, purchaseRes)
                                        .then(stockRes => {
                                            res.status(200).json(doc);
                                        })
                                })
                        } else {
                            /** temp stock update */
                            McConsumableTempStockController.mc_cons_temp_stock_update(req, res, doc)
                                .then(doc => {
                                    /**purchase update */
                                    purchase_update_one(req, res)
                                        .then(doc1 => {
                                            /** purchase report updation */
                                            PurchaseReportController.purchase_report_update(req, res, doc1)
                                                .then(doc => {
                                                    res.status(200).json(doc);
                                                })
                                        })
                                })
                        }
                    })

            } else if (req.body.items.stockType === 'MPS') {
                McPartsTempStockController.mc_parts_temp_stock_find_one(req, res)
                    .then(doc => {
                        if (doc == null) {
                            /**Purchase find One */
                            purchase_find_one(req, res)
                                .then(purchaseRes => {
                                    /**  find a particular item in stock */
                                    McPartsStockController.mc_parts_stock_find(req, res, purchaseRes)
                                        .then(stockRes => {
                                            res.status(200).json(doc);
                                        })
                                })
                        } else {
                            /** temp stock update */
                            McPartsTempStockController.mc_parts_temp_stock_update(req, res, doc)
                                .then(doc => {
                                    /**purchase update */
                                    purchase_update_one(req, res)
                                        .then(doc1 => {
                                            /** purchase report updation */
                                            PurchaseReportController.purchase_report_update(req, res, doc1)
                                                .then(doc => {
                                                    res.status(200).json(doc);
                                                })
                                        })
                                })
                        }
                    })
            }
        })
}

module.exports.purchase_update_one = purchase_update_one;
