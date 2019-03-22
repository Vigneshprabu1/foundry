const mongoose = require('mongoose');
const UnitMaster = require('../../model/master/unit-master');
const dateTime = require('node-datetime');

/** gat all unit master details */
exports.unitMaster_get_all = (req, res, next) => {
    UnitMaster.find()
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

/** unit master save */
exports.unitMaster_save = (req, res, next) => {
    const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S');
      const unitMaster = new UnitMaster({
        _id: new mongoose.Types.ObjectId(),
        unitType: req.body.unitType,
        createdOn: date,
        createdBy: req.body.createdBy,
        status:'A'
    });
    unitMaster.save()
        .then(doc => {
            res.status(200).json(doc)
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}

/** unit master update */
exports.unitMaster_update = (req, res, next) => {
    const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S');
    UnitMaster.findByIdAndUpdate({ _id: req.body._id }, {
        $set: {
            unitType: req.body.unitType,
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

/** delete unit details */
exports.unitMaster_delete = (req, res, next) => {
    const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S');
    UnitMaster.findByIdAndUpdate({ _id: req.body._id }, {
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
            })
        })
}