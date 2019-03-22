const mongoose = require('mongoose');
//Model
const Melt = require('../../model/production/melt');
const OnGoingMelt = require('../../model/production/onGoing-Melt');
const Moulding = require('../../model/production/moulding');
const Melting = require('../../model/production/melting');
const Pouring = require('../../model/production/pouring');
const KnockOut = require('../../model/production/knock-out');
const ShotBlasting = require('../../model/production/shot-blasting-detail');
const Fettling = require('../../model/production/fettling');


// checking with meltId
exports.get_percentage = (req, res) => {
    const meltId = req.params.meltId;
    var tempValue = 0;
    var knockout = 0;
    var shotBlasting = 0;
    var fettling = 0;
    var value = 0;
    var meltNo;
    Melt.findById({ '_id': meltId })
        .exec()
        .then(doc => {
            meltNo = doc.meltNo;
        })
    OnGoingMelt.find({ 'meltId': meltId })
        .exec()
        .then(docs1 => {
            if (docs1.length == 0) {
                res.status(200).json(value);
            } else {
                tempValue = 25 / (docs1.length);
                knockout = 20 / (docs1.length);
                shotBlasting = 15 / (docs1.length);
                fettling = 15 / (docs1.length);
                Moulding.find({ 'meltNo': meltNo })
                    .exec()
                    .then(docs2 => {
                        if (docs2.length == 0) {
                            res.status(200).json(value);
                        } else {
                            docs2.forEach(element1 => {
                                if (element1.endDate != undefined) {
                                    value = tempValue + tempValue;
                                }
                                else {
                                    res.status(200).json(value);
                                }
                            })
                            Melting.findOne({ 'meltNo': meltNo })
                                .exec()
                                .then(docs3 => {
                                    if (docs3 == null) {
                                        res.status(200).json(value);
                                    }
                                    else {
                                        value = value + 15;
                                    }
                                    Pouring.findOne({ 'meltNo': meltNo })
                                        .exec()
                                        .then(docs4 => {
                                            if (docs4 == null) {
                                                res.status(200).json(value);
                                            }
                                            else {
                                                value = value + 10;
                                            }
                                            KnockOut.find({ 'meltNo': meltNo })
                                                .exec()
                                                .then(docs5 => {
                                                    docs5.forEach(element2 => {
                                                        if (element2.endTime != undefined) {
                                                            value = value + knockout;
                                                        }
                                                        else {
                                                            res.status(200).json(value);
                                                        }
                                                    })
                                                    ShotBlasting.find({'meltNo': meltNo})
                                                        .exec()
                                                        .then(docs6 => {
                                                            docs6.forEach(element3 => {
                                                                if (element3.endTime != undefined) {
                                                                    value = value + shotBlasting;
                                                                }
                                                                else {
                                                                    res.status(200).json(value);
                                                                }
                                                            })
                                                            Fettling.find({ 'meltNo': meltNo })
                                                                .exec()
                                                                .then(docs7 => {
                                                                    docs7.forEach(element4 => {
                                                                        if (element4.endTime != undefined) {
                                                                            value = value + fettling;
                                                                        }
                                                                        else {
                                                                            res.status(200).json(value);
                                                                        }
                                                                    })
                                                                    res.status(200).json(value);
                                                                })
                                                                .catch(err => {
                                                                    res.status(500).json({
                                                                        error: err
                                                                    });
                                                                })
                                                        })
                                                })
                                        })
                                })
                        }
                    })
            };
        })

}

