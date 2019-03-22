const mongoose = require('mongoose');
const Salary = require('../../model/master/salary');
const dateTime = require('node-datetime');


exports.salary_get_all = (req, res, next) => {
    Salary.find()
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

exports.get_salary = (req, res, next) => {
    Salary.find()
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

exports.salary_save = (req, res, next) => {
    const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S');
    const salary = new Salary({
        _id: new mongoose.Types.ObjectId(),
        salaryType: req.body.salaryType,
        workingDays: req.body.workingDays,
        status: req.body.status,
        createdOn: date,
        createdBy: req.body.createdBy,

    });
    salary.save()
        .then(doc => {
            res.status(200).json(doc)
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}

exports.salary_update = (req, res, next) => {
    const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S');
    Salary.findByIdAndUpdate({ _id: req.body._id }, {
        $set: {
            salaryType: req.body.salaryType,
            workingDays: req.body.workingDays,
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

exports.salary_delete = (req, res, next) => {
    const dt = dateTime.create();
    const formatted = dt.format('Y-m-d H:M:S');
    Salary.update({ _id: req.params._id }, {
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
