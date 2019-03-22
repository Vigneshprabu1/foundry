const mongoose = require('mongoose');
const ShotBlastingMaster = require('../../model/master/shot-blasting-master');
const dateTime = require('node-datetime');


exports.shotBlastingMaster_get_consumable = (req, res, next) => {
    ShotBlastingMaster.find({'itemType':'Consumable'})
    .exec()
        .then(docs => {
            res.status(200).json(docs)
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}
exports.shotBlastingMaster_get_part = (req, res, next) => {
    ShotBlastingMaster.find({'itemType':'Parts'})
    .exec()
        .then(docs => {
            res.status(200).json(docs)
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}

exports.shotBlastingMaster_save = (req, res, next) => {
    const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S');
    const shotBlastingMaster = new ShotBlastingMaster({
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
    shotBlastingMaster.save()
        .then(doc => {
            res.status(200).json(doc)
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
}

exports.shotBlastingMaster_update = (req, res, next) => {
    const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S');
    ShotBlastingMaster.findByIdAndUpdate({ _id: req.body._id }, {
        $set: {
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
            status: req.body.status,
            modifiedOn: date,
            modifiedBy: req.body.modifiedBy
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



/** delete shotBlasting details */
exports.shotBlasting_delete = (req, res, next) => {
    const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S');
    ShotBlastingMaster.findByIdAndUpdate({ _id: req.body._id }, {
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


/* Functions */

/* getting shot blasting details based on machineId */
async function shot_blasting_detail_get_based_on_machineId(machineId) {
    var result = await  ShotBlastingMaster.findOne({$and:[{ 'machineId': machineId },{'status':'Active'}]})
        .exec();
    return result;
}

module.exports.shot_blasting_detail_get_based_on_machineId = shot_blasting_detail_get_based_on_machineId;