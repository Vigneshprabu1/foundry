const dateTime = require('node-datetime');
const mongoose = require('mongoose');
const FettlingMaster = require('../../model/master/fettling-master');

exports.fettlingMaster_get_consumable = (req, res, next) => {
    FettlingMaster.find({'itemType':'Consumable'})
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

exports.fettlingMaster_get_part = (req, res, next) => {
    console.log('partsnansnna')
    FettlingMaster.find({'itemType':'Parts'})
        .exec()
        .then(docs => {
            console.log('parts',docs)
            res.status(200).json(docs);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}

exports.fettlingMaster_save = (req, res, next) => {
    const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S');
    const fettlingMaster = new FettlingMaster({
        _id: new mongoose.Types.ObjectId(),
        machineId: req.body.machineId,
        machineName: req.body.machineName,
        itemType:req.body.itemType,
        consumableName: req.body.consumableName,
        totalCapacity: req.body.totalCapacity,
        perKgCost: req.body.perKgCost,
        replacementRate: req.body.replacementRate,
        replacementQuantity:req.body.replacementQuantity,
       // machineStatus: req.body.machineStatus,
        partName:req.body.partName,
        partCost:req.body.partCost,
        createdOn: date,
        createdBy: req.body.createdBy,
        status: req.body.status
    });
    fettlingMaster.save()
        .then(doc => {
            res.status(200).json(doc)
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
}

exports.fettlingMaster_update = (req, res, next) => {
    const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S');
    console.log(req.body);
    FettlingMaster.findByIdAndUpdate({ _id: req.body._id }, {
        $set: {
            machineId: req.body.machineId,
            machineName: req.body.machineName,
            itemType:req.body.itemType,
            consumableName: req.body.consumableName,
            totalCapacity: req.body.totalCapacity,
            perKgCost: req.body.perKgCost,
            replacementRate: req.body.replacementRate,
            replacementQuantity:req.body.replacementQuantity,
            partName:req.body.partName,
            partCost:req.body.partCost,
            modifiedOn: date,
            modifiedBy: req.body.modifiedBy,
            status: req.body.status
        }
    },
        { new: true })
        .exec()
        .then(doc => {
            res.status(200).json(doc)
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}

/** delete fettling details */
exports.fettling_delete = (req, res, next) => {
    const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S');
    FettlingMaster.findByIdAndUpdate({ _id: req.body._id }, {
        $set: {
            modifiedOn: date,
            modifiedBy: req.body.modifiedBy,
            status: 'D'
        }
    },
        { new: true })
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

/* function for getting perKg cost from fettling master using machineId */
async function fettlingMaster_cost_calculation(machineId) {
    var fettlingCostData;
    var fettlingMaster = await FettlingMaster.findOne({$and:[{ 'machineId': machineId },{'status':'Active'}]})
        .exec()
        .then(docs => {
            fettlingCostData = docs.perKgCost;
            return fettlingCostData;
        });
    return fettlingCostData;

}

module.exports.fettlingMaster_cost_calculation = fettlingMaster_cost_calculation;