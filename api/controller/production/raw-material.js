/* 
module name: Production
sub-module name: Rawmaterial
*/

/* import module*/
const mongoose = require('mongoose');

/** model */
const RawMaterialPreData = require('../../model/master/raw-material-pre-data');
const RawMaterial = require('../../model/production/raw-material');
const OnGoingMelt = require('../../model/production/onGoing-Melt');
const Stock = require('../../model/stock');

/**controller */
const Melt = require('./Melt');
const Return = require('./return-and-rejection')
const StockController = require('../stock');

/* getting rawmaterial details using meltno */
exports.get_raw_material_details_using_meltNo = (req, res) => {
    RawMaterial.find({ 'meltNo': req.params.meltNo })
        .exec()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}

/* raw material save */
async function raw_material_save_url(req, res) {
    var meltNo = req.params.meltNo;
    var meltId = req.params._id;
    var moldType = req.params.moldType;
    var rawMeltWeight = req.params.totalMeltWeight;
    var conumableWeight = req.params.totalMeltWeight;
    if (moldType == 'HM' || moldType == 'MM') {
        rawCalculation(req, res, meltNo, moldType, rawMeltWeight, conumableWeight);
    } else if (moldType == 'HM+MM') {
        var s = 2;
        var i;
        for (i = 0; i < s; i++) {
            if (i == 0) {
                moldType = 'HM';
            } else if (i == 1) {
                moldType = 'MM';
            }
            await OnGoingMelt.aggregate([
                {
                    $match: {

                        $and: [
                            { moldType: moldType },
                            { meltId: mongoose.Types.ObjectId(meltId) }
                        ]
                    }
                },
                {
                    $group:
                    {
                        _id: moldType,
                        meltWeight: { $sum: "$meltWeight" }
                    }
                }
            ])
                .exec()
                .then(docs => {
                    docs.forEach(doc => {
                        conumableWeight = doc.meltWeight;
                        rawMeltWeight = doc.meltWeight;
                        moldType = doc._id;

                        rawCalculation(req, res, meltNo, moldType, rawMeltWeight, conumableWeight)
                    });
                });
        }
    }
}

/*  rawmaterial  update */
exports.raw_material_update = (req, res) => {
    console.log('update fn');
    req.body.forEach(element => {
        console.log(element.meltNo);
        var rawMaterial = findRawMaterial(element.meltNo, element.itemName);
        rawMaterial.then(doc => {
            var itemWeight;
            var id;
            var moldType;
            var perKGCost;
            doc.forEach(data => {
                itemWeight = data.itemWeight;
                id = data._id;
                moldType = data.moldType;
                perKGCost = data.perKGCost;
            })
            if ((element.itemWeight > itemWeight || element.itemWeight < itemWeight)) {
                var weight = element.itemWeight - itemWeight;
                raw_material_update_async(req, res, id, moldType, element.itemWeight, perKGCost);
                console.log(element.itemCategory);
                if (element.itemCategory == 'NonReUsable') {
                    StockController.stock_updation(req, res, element.itemName, weight);
                    var melt = Melt.find_melt(element.meltNo)
                    melt.then(doc => {
                        weight = doc.totalMeltWeight + weight;
                        var diffQty = Number(doc.totalMeltWeight) - Number(weight);
                        Melt.meltUpdateRawmaterial(doc._id, weight, doc.meltStartDate, doc.meltEndDate, doc.moldingType)
                            .then(update => {
                                /* 2 % of total Melt Weight */
                                var oldMeltWeight = (2 / 100) * doc.totalMeltWeight;
                                if (diffQty > oldMeltWeight) {
                                    res.status(200).json({
                                        message: diffQty
                                    });
                                }
                                else {
                                    res.status(200).json({
                                        message: 'success'
                                    });
                                }
                            })
                    })
                }

            }
        })
    })
}

/* finding the predata of rawmaterial using moldtype*/
async function rawMaterialPreData(moldType) {
    var rawMaterial = await RawMaterialPreData.find({ moldType: moldType })
        .exec()
    return rawMaterial;
}

/* save method for rawmaterial*/
async function rawCalculation(req, res, meltNo, moldType, rawMeltWeight, conumableWeight) {
    var returnBalanceQty = 0.0;
    var itemNames = 'Return'
    var i = 1;
    Return.get_return(itemNames)
        .then(result => {
            var returnWeight = 0.0;
            var id;
            if (result) {
                returnWeight = result.weight;
                id = result._id;;
            }
            var returnBalanceQty = 0.0;
            rawMaterialPreData(moldType).then(result => {
                result.forEach(element => {
                    var itemName = element.itemName;
                    var itemType = element.itemType;
                    var itemCategory = element.itemCategory;
                    var itemPercentage = element.itemPercentage;
                    var meltWeight = Number(rawMeltWeight) * (Number(itemPercentage) / 100);
                    //perKg Cost getting from Stock
                    if (itemName == 'Return') {
                        var perKGCost = 0.0;
                        if (returnWeight > 0) {
                            if (returnWeight > meltWeight) {
                                returnWeight = Number(returnWeight) - Number(meltWeight);
                            } else if (returnWeight <= meltWeight) {
                                returnBalanceQty = Number(meltWeight) - Number(returnWeight);
                                meltWeight = returnWeight;
                                returnWeight = 0;
                            }
                            Return.return_update(itemName, returnWeight);
                            find_raw_material(req, res, meltNo, moldType, meltWeight, itemName, itemType, perKGCost, itemCategory);
                        } else {
                            returnBalanceQty = meltWeight;
                        }
                        i++;

                    } else {
                        rawmaterial_stock_updation(itemName)
                            .then(result1 => {
                                console.log('result',result1)
                                var perKGcost = 0.0;
                                if (itemCategory == 'NonReUsable') {
                                    perKGcost = result1.perKG;
                                    var Weight = Number(rawMeltWeight) * (Number(itemPercentage) / 100);
                                    if (itemName == 'Scrap') {
                                        Weight = Weight + returnBalanceQty;
                                    }
                                    //Save Method
                                    perKGcost = result1.perKG;
                                    find_raw_material(req, res, meltNo, moldType, meltWeight, itemName, itemType, perKGcost, itemCategory);
                                    //  StockController.stock_updation(req, res, itemName, Weight);
                                } else if (itemCategory == 'ReUsable') {
                                    perKGcost = result1.perKG;
                                    var Weight = Number(conumableWeight) * (Number(itemPercentage) / 100);
                                    //Save Method
                                    find_raw_material(req, res, meltNo, moldType, Weight, itemName, itemType, perKGcost, itemCategory);
                                }
                                if (i == result.length) {
                                    res.status(200).json(result);
                                }
                                i++;
                            });
                    }
                });
            })
                .catch(err => {
                    res.status(500).json(err);
                });
        })
        .catch(err => {
            res.status(500).json(err);
        });
}
async function rawmaterial_stock_updation(itemName) {
    var i = 1;
    var stockdata = await Stock.findOne({ 'itemName': itemName })
        .exec()
    return stockdata;
}

async function find_raw_material(req, res, meltNo, moldType, weight, itemName, itemType, perKGCost, itemCategory) {
    const meltNo1 = meltNo.replace(/\s/g, "");
    const moldTypes = moldType;
    var rawMaterial = findRawMaterial(meltNo1, itemName);
    console.log('innnnnn');
    rawMaterial.then(doc => {
        console.log('RawMaterialData', doc, itemCategory);
        if (doc.length == 0) {
            console.log("inside the doc", itemCategory);
            raw_material_save(req, res, meltNo1, moldTypes, itemName, itemType, weight, perKGCost, itemCategory);
        }
        else {
            var id;
            var moldType;
            var itemWeight;
            doc.forEach(data => {
                id = data._id;
                moldType = moldTypes + '+' + data.moldType;
                itemWeight = data.itemWeight + weight;
            })
            raw_material_update_async(req, res, id, moldType, itemWeight, perKGCost);
        }
    }).catch(err => {
        res.status(500).json(err);
    });
}

async function raw_material_save(req, res, meltNo, moldType, itemName, itemType, weight, perKGCost, itemCategory) {
    console.log("raw material save", meltNo, moldType, itemName, itemType, weight, perKGCost, itemCategory);
    var totalCost = Number(weight) * Number(perKGCost);
    console.log(totalCost);
    const rawMaterial = new RawMaterial({
        _id: new mongoose.Types.ObjectId(),
        meltNo: meltNo,
        moldType: moldType,
        itemName: itemName,
        itemType: itemType,
        itemWeight: weight.toFixed(2),
        perKGCost: perKGCost,
        itemCategory: itemCategory,
        totalCost: totalCost.toFixed(2)
    });
    await rawMaterial.save()
        .then(result => {
        })
        .catch(err => {
            res.status(500).json(err);
        });
}


async function raw_material_update_async(req, res, id, moldType, weight, perKGCost) {
    var totalCost = Number(weight) * Number(perKGCost);
    var rawResult = await RawMaterial.findByIdAndUpdate({ _id: id }, {
        $set: {
            moldType: moldType,
            itemWeight: weight,
            totalCost: totalCost
        }
    },
        { new: true })
        .exec()
        .then(result3 => {
            rawResult = result3;
            return rawResult;
        });
    return rawResult;
}


async function findRawMaterial(meltNo, itemName) {
    var material = await RawMaterial.find({ 'meltNo': meltNo })
        .where('itemName')
        .equals(itemName)
        .exec();
    return material;
}

async function findRawMaterial_meltNo(meltNo) {
    var material = RawMaterial.find({ 'meltNo': meltNo })
        .exec();
    return material;
}

module.exports.findRawMaterial = findRawMaterial;
module.exports.findRawMaterial_meltNo = findRawMaterial_meltNo;
module.exports.raw_material_save_url = raw_material_save_url;

