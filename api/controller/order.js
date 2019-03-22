
const dateTime = require('node-datetime');
const mongoose = require('mongoose');

/** Model */
const Order = require('../model/order');

/** Controller */
const CustomerController = require('./customer');
const ProductionController = require('./product');
const UnscheduledMeltController = require('./production/unscheduled-melt');

/** Get all Order */
exports.get_all_order = (req, res, next) => {
    Order.find()
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

exports.order_save = (req, res, next) => {
    
    

    if (!req.body.customer._id || !req.body.product._id || req.body.product._id == undefined) {
        if (!req.body.customer._id) {
              /* Customer Save Method Call the Customer Controller */
            CustomerController.customer_save(req, res)
                .then(doc => {
                    console.log(doc);
                    req.body.customer._id = doc._id;
                    if (req.body.customer._id && req.body.product._id) {
                          /* Order Save Method Call */
                        save_order(req, res);
                    }
                });
        }
        if (!req.body.product._id || req.body.product._id == undefined) {
              /* Production save Method Call the Production Controller*/
            ProductionController.production_save(req, res)
                .then(doc => {
                    req.body.product._id = doc._id;
                    if (req.body.customer._id && req.body.product._id) {
                          /* order save */
                        save_order(req, res);
                    }
                });
        }
    } else {
        /* order save */
        save_order(req, res);
    }
}

exports.get_order = (req, res, next) => {
    
    const id = req.params.orderId;
    Order.findById(id).populate('customer').populate('product')
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

/* save Order */
async function save_order(req, res) {
    const dt = dateTime.create();
    const formatted = dt.format('d-m-Y H:M:S');
    const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        date: formatted,
        customer: req.body.customer,
        product: req.body.product,
        quantity: req.body.quantity,
        paintingType: req.body.paintingType,
        deliveryDate: req.body.deliveryDate,
        createdBy: req.body.createdBy,
        createdOn: formatted,
        status: 'A'
    });
    order.save().then(doc => {
        /* save UnscheduledMelt */
        UnscheduledMeltController.unscheduled_save(req,res,doc);
    })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}



