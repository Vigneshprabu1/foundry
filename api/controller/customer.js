
const dateTime = require('node-datetime');
const mongoose = require('mongoose');
var json2csv = require('json2csv');
var csv = require('fast-csv');

/** Model */
const Customer = require('../model/customer')


/** Get All Customer */
exports.customer_get_all = (req, res, next) => {
    Customer.find()
        .where('status')
        .equals('A')
        .exec()
        .then(doc => {
            console.log(doc)
            res.status(200).json(doc)
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}

/** Customer Save */

exports.save_customer = (req, res, next) => {
    const dt = dateTime.create();
    const formatted = dt.format('Y-m-d H:M:S');
    const customer = new Customer({
        _id: new mongoose.Types.ObjectId(),
        customerName: req.body.customerName,
        mobileNo: req.body.mobileNo,
        emailId: req.body.emailId.toLowerCase(),
        address: req.body.address,
        createdOn: formatted,
        status: 'A'
    });
    customer.save()
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => {
            res.status(500).json({
                error: err

            });
        });
}


exports.customer_update = (req, res, next) => {
    const dt = dateTime.create();
    const formatted = dt.format('Y-m-d H:M:S');
    Customer.update({ _id: req.params.customerId }, {
        $set: {
            customerName: req.body.customerName,
            mobileNo: req.body.mobileNo,
            emailId: req.body.emailId.toLowerCase(),
            address: req.body.address,
            modifiedOn: formatted,
            status: 'A'
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


exports.customer_get_one = (req, res, next) => {
    Customer.findById(req.params.customerId)
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


exports.customer_delete = (req, res, next) => {
    const dt = dateTime.create();
    const formatted = dt.format('Y-m-d H:M:S');
    Customer.update({ _id: req.params.customerId }, {
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




exports.customer_import_database = function (req, res) {
    if (!req.files)
        return res.status(400).send('No files were uploaded.');

    var customerFile = req.files.file;

    var customer = [];

    csv
        .fromString(customerFile.data.toString(), {
            headers: true,
            ignoreEmpty: true
        })
        .on("data", function (data) {
            data['_id'] = new mongoose.Types.ObjectId();
            data['customer'] =
                customer.push(data);
        })
        .on("end", function () {
            Customer.create(customer, function (err, documents) {
                if (err) throw err;
            });
            res.send(customer.length + ' products have been successfully uploaded.');
        });
};

async function customer_save(req, res) {
    const dt = dateTime.create();
    console.log('customer',req.body.customer);
    const formatted = dt.format('d-m-Y H:M:S');
    var customers;
    const customer = new Customer({
        _id: new mongoose.Types.ObjectId(),
        customerName: req.body.customer.customerName,
        mobileNo: req.body.customer.mobileNo,
        emailId: req.body.customer.emailId,
        address: req.body.customer.address,
        createdBy: req.body.customer.createdBy,
        createdOn: formatted,
        status: 'A'
    });
    await customer.save()
        .then(doc => {
            console.log('save',doc);
            customers = doc;
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        })
    return customers;
}
module.exports.customer_save = customer_save;