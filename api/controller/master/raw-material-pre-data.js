const mongoose = require('mongoose');
const RawMaterialPreData = require('../../model/master/raw-material-pre-data');
const dateTime = require('node-datetime');

/** gat all rawmateril pre data */
exports.rawMaterialPreData_get_all = (req, res, next) => {
    RawMaterialPreData.find()
    .where('status')
    .equals('A')
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

/** rawmateril pre data save */
exports.rawMaterialPreData_save = (req, res, next) => {
    const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S');
    const rawMaterialPreData = new RawMaterialPreData({
        _id: new mongoose.Types.ObjectId(),
        itemName: req.body.itemName,
        itemType: req.body.itemType,
        itemCategory: req.body.itemCategory,
        itemPercentage: req.body.itemPercentage,
        moldType: req.body.moldType,
        createdOn: date,
        createdBy: req.body.createdBy,
        status:'A'
    });
    rawMaterialPreData.save()
        .then(doc => {
            console.log(doc);
            res.status(200).json(doc)
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}

/** rawmateril pre data update */
exports.rawMaterialPreData_update = (req, res, next) => {
    const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S');
    RawMaterialPreData.findByIdAndUpdate({ _id: req.body._id }, {
        $set: {
            itemName: req.body.itemName,
            itemType: req.body.itemType,
            itemCategory: req.body.itemCategory,
            itemPercentage: req.body.itemPercentage,
            moldType: req.body.moldType,
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
            });
        });
}

/** delete rawmateril details */
exports.rawMateril_delete = (req, res, next) => {
    const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S');
    RawMaterialPreData.findByIdAndUpdate({ _id: req.body._id }, {
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