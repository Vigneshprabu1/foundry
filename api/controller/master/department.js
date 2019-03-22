const mongoose = require('mongoose');
const Department = require('../../model/master/departmet');
const dateTime = require('node-datetime');


exports.department_get_all = (req, res, next) => {
    Department.find()
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

exports.get_department = (req, res, next) => {
    console.log('req.params.activity',req.params.activity);
    Department.find({$and: [{ activity: req.params.activity},{status:'Active'}]})
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

exports.department_save = (req, res, next) => {
    const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S');
    const department = new Department({
        _id: new mongoose.Types.ObjectId(),
        activity: req.body.activity,
        department: req.body.department,
        status: req.body.status,
        createdOn: date,
        createdBy: req.body.createdBy,

    });
    department.save()
        .then(doc => {
            res.status(200).json(doc)
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}

exports.department_update = (req, res, next) => {
    const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S');
    Department.findByIdAndUpdate({ _id: req.body._id }, {
        $set: {
            activity: req.body.activity,
            department: req.body.department,
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

exports.department_delete = (req, res, next) => {
    const dt = dateTime.create();
    const formatted = dt.format('Y-m-d H:M:S');
    Department.update({ _id: req.params._id }, {
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
