const mongoose = require('mongoose');
const dateTime = require('node-datetime');
const differenceBy = require('lodash.differenceby');
//Schema
const SandDisposal = require('../../model/production/sand-disposal');
const RawMaterial = require('../../model/production/raw-material');
const RawMaterialController = require('../../controller/production/raw-material');
const SandDisposalMaster = require('../../model/master/sand-disposal-master');
const Stock = require('../../model/stock');
const SandDisposalStock = require('../../model/production/sand-disposal-stock');
const SandDispatch = require('../../model/production/sand-dispatching');
const OnGoingMelt = require('../../model/production/onGoing-Melt');
const Moulding = require('../../model/production/moulding');
const WaySlipEntry = require('../../model/production/way-slip-entry');
/* controller */
const StockController = require('../../controller/stock');


//get all sand disposal details
exports.get_sand_disposal_details = (req, res) => {
    SandDisposal.find()
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

/* get Sand disposal Stock  */
exports.get_sand_disposal_stock = (req, res) => {
    console.log('get_sand_disposal_stock');
    SandDisposalStock.find()
        .exec()
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        })
}

/*get Sand disposal details using meltno*/
exports.sand_disposal_get_using_batchId = (req, res) => {
    SandDisposal.findOne({ 'batchId': req.params.batchId })
        .exec()
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
};


exports.sand_disposal_save_using_batchId = (req, res) => {
    //Get current DateTime
    const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S');
    Moulding.findOne({ 'batchId': req.params.batchId })
        .exec()
        .then(docs => {
            SandDisposalMaster.find({ 'moldType': docs.moldType })
                .where('status')
                .equals('Active')
                .exec()
                .then(docs2 => {
                    docs2.forEach(element => {
                        const sandDisposal = new SandDisposal({
                            _id: new mongoose.Types.ObjectId(),
                            meltNo: docs.meltNo,
                            batchId: req.params.batchId,
                            itemName: element.itemName,
                            mouldWeight: docs.weight,
                            disposalPercentage: element.disposalPercentage,
                            totalWeight: Number(docs.noOfPieces) * Number(docs.weight),
                            weightDisposed: ((Number(element.disposalPercentage) / 100) * Number(docs.noOfPieces) * Number(docs.weight)).toFixed(3),
                            createdOn: date,
                        });
                        sandDisposal.save()
                            .then(result => {
                                res.status(200).json(result);
                            })
                            .catch(err => {
                                res.status(500).json({
                                    error: err
                                });
                            })
                    })
                })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        })
}


//update method
exports.sand_disposal_update = (req, res, next) => {
    //Get Current DateTime
    const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S');
    var batchId = req.body.sandDisposal.batchId;
    var disposalPercentage = (Number(req.body.sandDisposal.weightDisposed) * 100 / Number(req.body.sandDisposal.totalWeight)).toFixed(3);
    SandDisposal.findOneAndUpdate({ 'batchId': batchId }, {
        $set: {
            meltNo: req.body.sandDisposal.meltNo,
            batchId: batchId,
            itemName: req.body.sandDisposal.itemName,
            weightDisposed: req.body.sandDisposal.weightDisposed,
            mouldWeight: req.body.sandDisposal.mouldWeight,
            disposalPercentage: disposalPercentage,
            totalWeight: req.body.sandDisposal.totalWeight,
            modifiedOn: date,
        }
    },
        { new: true })
        .exec()
        .then(docs => {
            save_sand_disposal_stock(docs.itemName, docs.weightDisposed);
            res.status(200).json(docs);

        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
};

/* getting all sand dispatching deatils using invoice number */
exports.get_all_sand_dispatching_invoice = (req, res, next) => {
    console.log('get_all_sand_dispatching_invoice');
    SandDispatch.distinct('disposalInvoiceNo')
        .exec()
        .then(result => {
            console.log('disposalInvoiceNo', result);
            res.status(200).json(result);
        })
        .catch(err => {
            res.status().json({
                error: err
            });
        });


}

/* getting all sand dispatching deatils using invoice number */
exports.get_sand_dispatching_invoice_using_disposalNo = (req, res, next) => {
    SandDispatch.find({ disposalInvoiceNo: req.params.disposalInvoiceNo })
        .populate('waySlipEntry')
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status().json({
                error: err
            });
        });


}


/* Get Sand Dispatching InvoiceNo*/
exports.get_sand_dispatching_invoiceNo = (req, res) => {
    //Get Current DateTime
    const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S');
    var i = 0;
    var day = date.substring(8, 10);
    var month = date.substring(5, 7);
    var year = date.substring(2, 4);
    var invoiceNo;
    get_invoice_no(day, month, year)
        .then(docs => {
            if (docs.length == 0) {
                invoiceNo = 'DS' + day + month + year + '01';
                res.status(200).json(invoiceNo);

            }
            else {
                docs.forEach(element => {
                    i++;
                    invoiceNo = element.disposalInvoiceNo;
                    var no = invoiceNo.substring(8, 10);
                    console.log('no', no);
                    var no1 = Number(no) + 01;
                    console.log('no1', no1);
                    invoiceNo = 'DS' + day + month + year + '0' + no1;
                    console.log('invoiceNo', invoiceNo);
                    if (docs.length == i) {
                        res.status(200).json(invoiceNo);

                    }
                })
            }

        });


}


/* way slip and sand disptching save*/

exports.way_slip_entry_save = (req, res, next) => {
    console.log('inside way slip entry');
    console.log('req.body', req.body);
    const waySlip = req.body.waySlipEntry;
    waySlip.forEach(wayslipdata => {
        way_slip_save(req, res, wayslipdata)
            .then(result => {
                /* save function */
                sand_dispatching_save(req, res, result, req.body.disposalInvoiceNo);
                res.status(200).json({
                    "message": "success"
                })
            });

    });
}

/* getting the last inserted record from sand dispatching */
exports.get_last_record = (req, res, next) => {
    console.log('last record method');
    SandDispatch.find()
        .sort({ _id: -1 }).limit(1)
        .exec()
        .then(result => {
            console.log('result', result);
            if(result.length > 0) {
                result.forEach(element => {
                    console.log('result.invoiceNo', element.disposalInvoiceNo);
                    find_sand_dispatching_disposal_invoice_no(element.disposalInvoiceNo).then(docs => {
                        console.log('docs', docs);
                        res.status(200).json(docs);
                    })
                })
            } else {
                res.status(200).json(result);
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}

/* delete the wayslip entry using objectId */
exports.way_slip_delete = (req, res, next) => {
    console.log('delete called', req.body);
    WaySlipEntry.findByIdAndDelete({ _id: req.body._id })
        .exec()
        .then(result => {
            console.log('delete success fully');
            SandDispatch.findOneAndDelete({ 'waySlipEntry': req.body._id })
                .exec()
                .then(result1 => {
                    console.log('finally deleted');
                    res.status(200).json(result);
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    });
                });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}


/* save_sand_disposal_stock */
function save_sand_disposal_stock(itemName, weightDisposed) {
    //Get Current DateTime
    const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S');
    SandDisposalStock.findOne({ 'itemName': itemName })
        .exec()
        .then(docs1 => {
            //console.log('docs1', docs1)
            if (docs1 == null) {
                const sandDisposalStock = new SandDisposalStock({
                    _id: new mongoose.Types.ObjectId(),
                    itemName: itemName,
                    quantity: weightDisposed,
                    createdOn: date,
                });
                sandDisposalStock.save()
                    .then(docs2 => {
                        //console.log('docs', docs2);
                        return docs2;
                    })
            }
            else {
                SandDisposalStock.updateOne({ itemName: itemName }, {
                    $set: {
                        quantity: Number(docs1.quantity) + Number(weightDisposed),
                        modifiedOn: date,
                    }
                },
                    { new: true })
                    .exec()
                    .then(doc => {
                        return doc;
                    })
            }

        })
}

/* stock updation function */
async function sand_disposal_stock_update(docs, disposalWeight) {
    //Get Current DateTime
    const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S');
    var weight = 0;
    if (docs.unit == 'CFT') {
        weight = 68.15 * Number(disposalWeight);
    }
    else {
        weight = Number(disposalWeight);
    }
    var result = await SandDisposalStock.updateOne({ itemName: docs.itemName }, {
        $set: {
            quantity: Number(docs.itemWeight) - Number(weight),
            modifiedOn: date,
        }
    },
        { new: true })
        .exec()
        .then(doc => {
            StockController.stock_updation_consumable(docs.itemName, weight);
        })
    return result;
}

/* get invoice number */
async function get_invoice_no(day, month, year) {
    console.log('getinvoice methode', year, day, month);
    var result = await SandDispatch.find({ $and: [{ day: day }, { month: month }, { year: year }] })
        .exec()
    return result;
}

/* way slip save function */
async function way_slip_save(req, res, wayslipdata) {
    //Get Current DateTime
    const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S');

    var day = date.substring(8, 10);
    var month = date.substring(5, 7);
    var year = date.substring(2, 4);
    var waySlipSaveData;
    const waySlipEntry = new WaySlipEntry({
        _id: new mongoose.Types.ObjectId(),
        waySlipDate: wayslipdata.waySlipDate,
        waySlipNumber: wayslipdata.waySlipNumber,
        itemName: wayslipdata.itemName,
        itemWeight: wayslipdata.itemWeight,
        disposalWeight: wayslipdata.disposalWeight,
        unit: wayslipdata.unit,
        cost: wayslipdata.cost,
        day: day,
        month: month,
        year: year,
        createdOn: date,
        createdBy: req.body.createdBy
    });
    var result = waySlipEntry.save()
        .then(docs => {
            waySlipSaveData = docs;
            return waySlipSaveData;
        });
    return result;
}

/* invoice number generate or checking */
async function invoice_check(req, res, waySlipData) {
    console.log("sand dispatching save");
    //Get Current DateTime
    const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S');
    var sandDispatchData;
    var day = date.substring(8, 10);
    var month = date.substring(5, 7);
    var year = date.substring(2, 4);
    var invoiceNo;
    var i = 0;
    get_invoice_no(day, month, year)
        .then(docs => {
            if (docs.length == 0) {
                invoiceNo = 'DS' + day + month + year + '01';
            }
            else {
                docs.forEach(element => {
                    i++;
                    invoiceNo = element.invoiceNo;
                    var no = invoiceNo.substring(8, 10);
                    no = Number(no) + 01;
                    invoiceNo = 'DS' + day + month + year + '0' + no;
                    if (docs.length == i) {

                    }
                })
            }




        });




}
/* sand dispatching save function */
async function sand_dispatching_save(req, res, waySlipData, invoiceNo) {
    console.log('sand dispatch save', waySlipData);
    //Get Current DateTime
    const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S');
    const sandDispatch = new SandDispatch({
        _id: new mongoose.Types.ObjectId(),
        disposalInvoiceNo: invoiceNo,
        disposalNumber: req.body.disposalNumber,
        vendorName: req.body.vendorName,
        invoiceNo: req.body.invoiceNo,
        invoiceDate: req.body.invoiceDate,
        waySlipNumber: waySlipData.waySlipNumber,
        waySlipEntry: waySlipData._id,
        totalCost: req.body.totalCost,
        day: date.substring(8, 10),
        month: date.substring(5, 7),
        year: date.substring(2, 4),
        createdOn: date,
        createdBy: req.body.createdBy
    });
    var result = sandDispatch.save()
        .then(result => {
            var weight = waySlipData.disposalWeight;
            /* stock updation*/
            sand_disposal_stock_update(waySlipData, weight);
            return result;


        });
    return result;

}

/* update wayslip and sand dispatching */
exports.way_slip_entry_update = (req, res, next) => {
    const id = req.params._id;
    const waySlipArray = req.body.waySlipEntry;
    var sandDispatchingData = find_sand_dispatching_disposal_invoice_no(req.body.disposalInvoiceNo)
        .then(sandDispatch => {
            /*(difference between two array object based on waySlipNumber) */
            const myDifferences = differenceBy(waySlipArray, sandDispatch, 'waySlipNumber');

            if (myDifferences.length == 0) {
                /* finding the weight */
                req.body.waySlipEntry.forEach(newdata => {
                    var waySlipNumber;
                    var disposalWeight;
                    var waySlipId;
                    sandDispatch.forEach(olddata => {
                        waySlipNumber = olddata.waySlipEntry.waySlipNumber;
                        disposalWeight = olddata.waySlipEntry.disposalWeight;
                        waySlipId = olddata.waySlipEntry._id;
                        if (waySlipNumber == newdata.waySlipNumber) {
                            /* finding the updation weight */
                            if (newdata.disposalWeight > disposalWeight || newdata.disposalWeight < disposalWeight) {
                                var weight = newdata.disposalWeight - disposalWeight;
                                update_disposal_weight(req, res, waySlipId, newdata, req.body.disposalInvoiceNo)
                                    .then(result => {
                                        sand_disposal_stock_update(newdata, weight).then(docs1 => {
                                            res.status(200).json({
                                                "message": "success"
                                            });
                                        });
                                    });
                            } else {
                                res.status(200).json({
                                    "message": "success"
                                });
                            }
                        }
                    });
                });
            }
            else {
                var newwayslipnumber;
                myDifferences.forEach(waySlipData => {
                    newwayslipnumber = waySlipData.waySlipNumber;
                    /* make as a new entry in way slip  */
                    way_slip_save(req, res, waySlipData)
                        .then(result => {
                            sand_dispatching_save(req, res, result, req.body.disposalInvoiceNo)
                                .then(docs => {
                                    sand_dispatch_update_deatils(req, res, req.body.disposalInvoiceNo);
                                    res.status(200).json({
                                        "message": "success"
                                    });
                                });
                        });

                });

            }

        });
}

/* sand dispatching find method using disposal invocie number */
async function find_sand_dispatching_disposal_invoice_no(disposalInvoiceNo) {
    var sandDispatch = await SandDispatch.find({ 'disposalInvoiceNo': disposalInvoiceNo })
        .populate('waySlipEntry')
        .exec();
    return sandDispatch;

}

/* update disposal weight in way slip */
async function update_disposal_weight(req, res, id, wayslipdata, disposalInvoiceNo) {
    console.log('update fucntion called successdfully');
    //Get Current DateTime
    const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S');
    var sandDispatchData;
    var day = date.substring(8, 10);
    var month = date.substring(5, 7);
    var year = date.substring(2, 4);
    await WaySlipEntry.findByIdAndUpdate({ _id: id }, {
        $set: {
            waySlipDate: wayslipdata.waySlipDate,
            waySlipNumber: wayslipdata.waySlipNumber,
            itemName: wayslipdata.itemName,
            itemWeight: wayslipdata.itemWeight,
            disposalWeight: wayslipdata.disposalWeight,
            unit: wayslipdata.unit,
            cost: wayslipdata.cost,
            day: day,
            month: month,
            year: year,
            modifiedOn: date,
            modifiedBy: req.body.modifiedBy
        }
    },
        { new: true })
        .exec()
        .then(result => {
            console.log('result', result);
            sand_dispatch_update_deatils(req, res, disposalInvoiceNo);

        })
}

/* sand dispatch update details using disposalInvoiceNo*/
async function sand_dispatch_update_deatils(req, res, disposalInvoiceNo) {
    console.log('update function', disposalInvoiceNo, req.body);
    //Get Current DateTime
    const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S');
    await SandDispatch.updateMany({ disposalInvoiceNo: disposalInvoiceNo }, {
        $set: {
            vendorName: req.body.vendorName,
            invoiceNo: req.body.invoiceNo,
            invoiceDate: req.body.invoiceDate,
            totalCost: req.body.totalCost,
            modifiedOn: date,
            modifiedBy: req.body.modifiedBy
        }
    }, { new: true })
        .exec()
        .then(doc => {
            console.log('update result', doc);
        });

}

