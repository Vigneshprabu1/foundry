const mongoose = require('mongoose');
const MeltReport = require('../model/production/melt-report');
var request = require('request');

exports.get_Delivery_all_report = (req, res) => {
    console.log('customer1')
    MeltReport.find()
        .exec()
        .then(result => {
            console.log('customer', result)
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}
exports.get_filter_report = (req, res) => {
    console.log('1', req.body)
    if (req.body.customerName && !req.body.orderId && !req.body.meltNo && !req.body.fromDate && !req.body.toDate) {
        console.log('customer', req.body)
        MeltReport.find()
            .where('customerName')
            .equals(req.body.customerName)
            .exec()
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                });
            });
    } else if (!req.body.customerName && req.body.orderId && !req.body.meltNo && !req.body.fromDate && !req.body.toDate) {
        console.log('order', req.body)
        MeltReport.find()
            .where('orderId')
            .equals(req.body.orderId)
            .exec()
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                });
            });
    } else if (req.body.meltNo && !req.body.customerName && !req.body.orderId && !req.body.fromDate && !req.body.toDate) {
        console.log('melt', req.body)
        MeltReport.find()
            .where('meltNo')
            .equals(req.body.meltNo)
            .exec()
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                });
            });
    }
    else if (!req.body.customerName && !req.body.orderId && !req.body.meltNo && req.body.fromDate && req.body.toDate) {
        console.log(' date', req.body);
        MeltReport.find({ 'orderDate': { "$gte": req.body.fromDate, "$lt": req.body.toDate } })
            .exec()
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                });
            });
    } else if (req.body.customerName && req.body.orderId && !req.body.meltNo && !req.body.fromDate && !req.body.toDate) {
        console.log('customer and order', req.body);
        MeltReport.find({ 'orderId': req.body.orderId })
            .where('customerName')
            .equals(req.body.customerName)
            .exec()
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                });
            });
    } else if (req.body.customerName && req.body.orderId && !req.body.meltNo && req.body.fromDate && req.body.toDate) {
        console.log('customer and order and date', req.body);
        MeltReport.find({ 'orderDate': { "$gte": req.body.fromDate, "$lt": req.body.toDate }, 'orderId': req.body.orderId })
            .where('customerName')
            .equals(req.body.customerName)
            .exec()
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                });
            });
    } else if (req.body.customerName && !req.body.orderId && req.body.meltNo && !req.body.fromDate && !req.body.toDate) {
        console.log('customer and melt', req.body)
        MeltReport.find({ 'meltNo': req.body.meltNo })
            .where('customerName')
            .equals(req.body.customerName)
            .exec()
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                });
            });
    } else if (req.body.customerName && !req.body.orderId && req.body.meltNo && req.body.fromDate && req.body.toDate) {
        console.log('customer and melt and date', req.body)
        MeltReport.find({ 'orderDate': { "$gte": req.body.fromDate, "$lt": req.body.toDate }, 'meltNo': req.body.meltNo })
            .where('customerName')
            .equals(req.body.customerName)
            .exec()
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                });
            });
    }else if (req.body.customerName && !req.body.orderId && req.body.meltNo && req.body.fromDate && req.body.toDate) {
        console.log('all', req.body);
        MeltReport.find({ 'orderDate': { "$gte": req.body.fromDate, "$lt": req.body.toDate }, 'orderId':req.body.orderId, 'meltNo': req.body.meltNo })
            .where('customerName')
            .equals(req.body.customerName)
            .exec()
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                });
            });
    } else if (req.body.customerName && !req.body.orderId && !req.body.meltNo && req.body.fromDate && req.body.toDate) {
        console.log('customer and date', req.body);
        MeltReport.find({ 'orderDate': { "$gte": req.body.fromDate, "$lt": req.body.toDate } })
            .where('customerName')
            .equals(req.body.customerName)
            .exec()
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                });
            });
    } else if (!req.body.customerName && req.body.orderId && req.body.meltNo && !req.body.fromDate && !req.body.toDate) {
        console.log('order and melt', req.body);
        MeltReport.find({'orderId':req.body.orderId, 'meltNo': req.body.meltNo })
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
    } else if (!req.body.customerName && req.body.orderId && !req.body.meltNo && req.body.fromDate && req.body.toDate) {
        console.log('order and date', req.body);
        MeltReport.find({'orderId':req.body.orderId,  'orderDate': { "$gte": req.body.fromDate, "$lt": req.body.toDate }})
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
    } else if (!req.body.customerName && !eq.body.orderId && req.body.meltNo && req.body.fromDate && req.body.toDate) {
        console.log('melt and date', req.body);
        MeltReport.find({'meltNo':req.body.meltNo,  'orderDate': { "$gte": req.body.fromDate, "$lt": req.body.toDate }})
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
    }
}

exports.get_Delivery_report_all_ptf=(req, res) => {

    console.log('in')
    var data = {
        template: { 'shortid': 'B1DxpdOXV' },
        data:{
            "name":'Murugan',
          },
        options: {
            preview: false
        }
    }
    var options = {
        url: 'http://localhost:5400/api/report/',
        method: 'POST',
        json: data
    }
    request(options).pipe(res);
}
exports.get_Delivery_report_all_xlsx=(req, res) => {
    console.log('in')
    var data = {
        template: { 'shortid': 'S1dMpOOmN' },
        data:{
            "name":'Murugan',
          },
        options: {
            preview: false
        }
    }
    var options = {
        url: 'http://localhost:5400/api/report/',
        method: 'POST',
        json: data
    }
    console.log('options',options)
    request(options).pipe(res);
}

