const mongoose = require('mongoose');
const Shift = require('../../model/master/shift');
const dateTime = require('node-datetime');


exports.shift_get_all = (req, res, next) => {
    Shift.find()
        .exec()
        .then(docs => {
            res.status(200).json(docs)
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}

exports.get_shift = (req, res, next) => {
    Shift.find()
        .where('status')
        .equals('Active')
        .exec()
        .then(docs => {
            res.status(200).json(docs)
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}
exports.shift_save = (req, res, next) => {
    const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S');
    const shift = new Shift({
        _id: new mongoose.Types.ObjectId(),
        shift: req.body.shift,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        totalHours: req.body.totalHours,
        status: req.body.status,
        createdOn: date,
        createdBy: req.body.createdBy,

    });
    shift.save()
        .then(doc => {
            res.status(200).json(doc)
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}

exports.shift_update = (req, res, next) => {
    const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S');
    Shift.findByIdAndUpdate({ _id: req.body._id }, {
        $set: {
            shift: req.body.shift,
            startTime: req.body.startTime,
            endTime: req.body.endTime,
            totalHours: req.body.totalHours,
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
            });
        });
}

exports.shift_delete = (req, res, next) => {
    const dt = dateTime.create();
    const formatted = dt.format('Y-m-d H:M:S');
    Shift.update({ _id: req.params._id }, {
        $set: {
            modifiedOn: formatted,
            status: 'D'
        }
    })
        .exec()
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}
