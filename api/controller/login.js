const mongoose = require('mongoose');
const User = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login_user = (req, res, next) => {
        User.find({'emailId': req.body.emailId.toLowerCase()})
        .exec()
        .then(user => {
            if (user.length < 1) {
                res.status(401).json({
                    error: err
                })
            }
            bcrypt.compare(req.body.password, user[0].password, (err, doc) => {
                if (doc) {
                    return res.status(200).json(user);
                } else {
                    res.status(401).json({
                        error: err
                    })
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });

}

