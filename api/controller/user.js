const User = require('../model/user');
const mongoose = require('mongoose');
const dateTime = require('node-datetime');
const bcrypt = require('bcryptjs');
const Mail = require('../model/mail');


exports.user_get_all = (req, res, next) => {
    User.find()
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

exports.user_get = (req, res, next) => {
    User.find({ 'role': { $ne: 'Developer' } })
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

exports.user_save = (req, res, next) => {
    const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S');
    if (req.body.role === 'SuperAdmin') {
        Mail.find()
            .exec()
            .then(doc => {
                if (!doc.length) {      
                    const mail = new Mail({
                        _id: new mongoose.Types.ObjectId(),
                        emailId: req.body.emailId.toLowerCase(),
                        createdOn: date,
                        createdBy: req.body.createdBy,
                        status: 'A'
                    });
                    mail.save()
                        .then(doc => {
                        })
                        .catch(err => {
                            res.status(500).json({
                                error: err
                            })
                        })
                }
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                })
            })
    }

    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                error: err
            })
        } else {
            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                userName: req.body.userName,
                password: hash,
                emailId: req.body.emailId.toLowerCase(),
                mobile: req.body.mobile,
                address: req.body.address,
                role: req.body.role,
                roleStatus: req.body.roleStatus,
                createdOn: date,
                createdBy: req.body.createdBy,
                status: 'A'
            });
            user.save()
                .then(doc => {
                    res.status(200).json(doc)
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    });
                });
        }
    })
}

exports.user_update = (req, res, next) => {
    const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S');
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                error: err
            })
        } else {
            User.findByIdAndUpdate({ _id: req.body._id }, {
                $set: {
                    userName: req.body.userName,
                    password: hash,
                    emailId: req.body.emailId.toLowerCase(),
                    mobile: req.body.mobile,
                    address: req.body.address,
                    role: req.body.role,
                    roleStatus: req.body.roleStatus,
                    modifiedOn: date,
                    modifiedBy: req.body.modifiedBy
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
    })

}

exports.user_delete = (req, res, next) => {
    const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S');
    User.findByIdAndUpdate({ _id: req.body._id }, {
        $set: {
            modifiedOn: date,
            modifiedBy: req.body.modifiedBy,
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