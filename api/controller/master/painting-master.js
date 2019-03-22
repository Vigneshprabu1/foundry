const mongoose = require('mongoose');
const PaintingMaster = require('../../model/master/painting-master');
const dateTime = require('node-datetime');


exports.paintingMaster_get_all = (req, res, next) => {
    PaintingMaster.find()
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

exports.paintingMaster_save = (req, res, next) => {
     const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S');
    const paintingMaster = new PaintingMaster({
        _id: new mongoose.Types.ObjectId(),
        paintingType:req.body.paintingType,
        paintName:req.body.paintName,
        perLitreCost: req.body.perLitreCost,
        createdOn: date,
        createdBy: req.body.createdBy,
        status: req.body.status

    });
    paintingMaster.save()
        .then(doc => {
            res.status(200).json(doc)
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}

exports.paintingMaster_update = (req, res, next) => {
    const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S');
    PaintingMaster.findByIdAndUpdate({ _id: req.body._id }, {
        $set: {
            paintingType:req.body.paintingType,
            paintName:req.body.paintName,
            perLitreCost: req.body.perLitreCost,
            modifiedOn: date,
            modifiedBy: req.body.modifiedBy,
            status: req.body.status
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


/** delete painting details */
exports.painting_delete = (req, res, next) => {
    const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S');
    PaintingMaster.findByIdAndUpdate({ _id: req.body._id }, {
        $set: {
            modifiedOn: date,
            modifiedBy: req.body.modifiedBy,
            status: 'D'
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

/* Functions for getting consumable of painting details  */
async function get_painting_details_by_painting_type(paintingType,paintName){
    var result =PaintingMaster.findOne({$and:[{'paintingType':paintingType},{'paintName':paintName},{status:'Active'}]})
    .exec();
    return result;
}


 module.exports.get_painting_details_by_painting_type = get_painting_details_by_painting_type;