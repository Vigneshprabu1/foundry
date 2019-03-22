/* import module */
const mongoose = require('mongoose');
const dateTime = require('node-datetime');

/* model */
const Pouring = require('../../model/production/pouring');
const OnGoingMelt = require('../../model/production/onGoing-Melt');
const Melt = require('../../model/production/melt');
// import Datetime


//getting all data from DB
exports.pouring_get = (req, res) => {
    const meltNo = req.params.meltNo;
    Pouring.findOne({ 'meltNo': meltNo })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json(err);
        });

};


//Save mathod
exports.pouring_save = (req, res) => {
    const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S');
    const pouring = new Pouring({
        _id: new mongoose.Types.ObjectId(),
        meltNo: req.body.meltNo,
        pouringTemp: req.body.pouringTemp,
        pouringWeight: req.body.pouringWeight,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        noOfLabours: req.body.noOfLabours,
        createdOn:date
    });
    pouring.save()
        .then(result => {
            Melt.findOne({ 'meltNo': result.meltNo })
                .exec()
                .then(docs => {
                    OnGoingMelt.updateMany({ meltId: docs._id }, {
                        $set: {
                            pouring: result._id,
                            modifiedOn: date
                        }
                    }, { new: true })
                        .exec()
                        .then(doc => {
                            res.status(200).json(result);
                        })
                        .catch(err => {
                            res.status(500).json({
                                error: err
                            });
                        });
                })
        })
        .catch(err => {
            res.status(500).json(err);
        });
};


//update Method
exports.pouring_update = (req, res, next) => {
    const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S');
    const id = req.params._id;
    Pouring.findByIdAndUpdate({ _id: id }, {
        $set: {
            meltNo: req.body.meltNo,
            pouringTemp: req.body.pouringTemp,
            pouringWeight: req.body.pouringWeight,
            startTime: req.body.startTime,
            endTime: req.body.endTime,
            noOfLabours: req.body.noOfLabours,
            modifiedOn: date
        }
    },
        { new: true })
        .exec()
        .then(doc => {
            console.log(doc);
            res.status(200).json(doc);
        })
        .catch(err => {
            res.status(500).json(err);
        })
};

//Checking end time given or not in pouring
exports.pouring_check = (req, res) => {
    const meltNo = req.params.meltNo;
    Pouring.findOne({ 'meltNo': meltNo })
        .exec()
        .then(docs => {
            console.log(docs);
            console.log('endTime', docs.endTime)
            if (docs.endTime == undefined) {
                console.log('docs', docs);
                res.status(200).json({ 'message': 'Not-Completed', docs });
            }
            else {
                console.log('else docs', docs);
                res.status(200).json({ 'message': 'Completed', docs });
            }
        })
        .catch(err => {
            res.status(500).json(err);
        })
}

