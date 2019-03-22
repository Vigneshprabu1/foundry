const mongoose = require('mongoose');
const ActivityMaster = require('../../model/master/activity-master');
const dateTime = require('node-datetime');

/** gat all activity details */
exports.activity_master_get_all = (req, res, next) => {
    ActivityMaster.find()
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

/** activity master save */
exports.activity_master_save = (req, res, next) => {
     const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S');
    const activityMaster = new ActivityMaster({
        _id: new mongoose.Types.ObjectId(),
        activityType: req.body.activityType,
        createdOn: date,
        createdBy: req.body.createdBy,
        status:'A'
    });
    activityMaster.save()
        .then(doc => {
            res.status(200).json(doc)
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}

/** activity Master update */
exports.activity_master_update = (req, res, next) => {
    const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S');
    ActivityMaster.findByIdAndUpdate({ _id: req.body._id }, {
        $set: {
            activityType: req.body.activityType,
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

/** delete activity details */
exports.activityMaster_delete = (req, res, next) => {
    const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S');
    ActivityMaster.findByIdAndUpdate({ _id: req.body._id }, {
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