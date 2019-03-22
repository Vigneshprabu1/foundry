const Mail = require('../model/mail');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const dateTime = require('node-datetime');

exports.mail_save = (req, res, next) => {
    const mail = new Mail({
        _id: new mongoose.Types.ObjectId(),
        emailId: req.body.emailId,
        password: req.body.password,
        subject: req.body.subject,
        message: req.body.message,
        companyName: req.body.companyName
    });
    mail.save()
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}

exports.mail_get_all = (req, res, next) => {
    Mail.find()
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


exports.mail_send = (req, res, next) => {
    Mail.find()
        .exec()
        .then(mail => {
            mail.forEach(mailRes => {
                const date = req.body.deliveryDate.substring(0, 10);
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    secure: false,
                    port: 465,
                    auth: {
                        user: mailRes.emailId,
                        pass: mailRes.password
                    }
                });

                const mailOptions = {
                    from: mailRes.emailId,
                    to: req.body.vendor.email,
                    subject: mailRes.subject,
                    //text: 'Item Type:' req.body.items.itemName.'Quantity':req.body.items.quantity
                    html:
                        '<!DOCTYPE html>' +
                        '<html><head><title>Order Confirmation</title>' +
                        '</head><body><div>' +
                        '<p>Item :' + req.body.items.itemName + '</p>' +
                        '<p>Weight:' + req.body.weight + '</p>' +
                        '<p>Unit:' + req.body.items.unit + '</p>' +
                        '<p>Delivery Date:' + date + '</p>' +
                        '<p>Thank you </p>' +
                        '</div></body></html>'
                };

                transporter.sendMail(mailOptions, (error, info) => {
                    if (!error) {
                        console.log('Mail Send Successfully', info)
                    } else {
                        console.log('errorr')
                    }
                })

            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}

exports.mail_update = (req, res, next) => {
    const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S');
    Mail.findByIdAndUpdate({ _id: req.body._id }, {
        $set: {
            companyName: req.body.companyName,
            emailId: req.body.emailId,
            password: req.body.password,
            subject: req.body.subject,
            message: req.body.message,
            modifiedOn: date,
            modifiedBy: req.body.modifiedBy,
        }
    })
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