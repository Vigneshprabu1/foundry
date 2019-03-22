/* Import Mongoose */
const mongoose = require('mongoose');

/*Import sand_disposal Master Schema*/
const SandDisposalMaster = require('../../model/master/sand-disposal-master');
const dateTime = require('node-datetime');


/* Get All sand_disposal Master */
exports.get_sand_disposal_master = (req, res) => {
    SandDisposalMaster.find()
        .exec()
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(error => {
            res.status(500).json({
                "message": "errorrrr"
            })
        })
}

/*  Save sand_disposal Master */
exports.save_sand_disposal_master = (req, res, next) => {
    /*Get Current Date and Time */
    const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S');
    const sandDisposalMaster = new SandDisposalMaster({
        _id: new mongoose.Types.ObjectId(),
        itemName: req.body.itemName,
        disposalPercentage: req.body.disposalPercentage,
        moldType:req.body.moldType,
        status: req.body.status,
        createdOn: date,
        createdBy: req.body.createdBy,
    });
    sandDisposalMaster.save()
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
}


/*Update sand_disposal Master */
exports.update_sand_disposal_master = (req, res, next) => {
    /*Get Current Date and Time */
    const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S');
    SandDisposalMaster.findByIdAndUpdate({ _id: req.body._id }, {
        $set: {
            itemName: req.body.itemName,
            disposalPercentage: req.body.disposalPercentage,
            moldType:req.body.moldType,
            status: req.body.status,
            modifiedOn: date,
            modifiedBy: req.body.modifiedBy
        }
    },
        { new: true })
        .exec()
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}

/* Change the status from S To D */
exports.delete_sand_disposal_master = (req, res) => {
    /*Get Current Date and Time */
    const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S');
    SandDisposalMaster.findByIdAndUpdate({ _id: req.body._id }, {
        $set: {
            status: 'D',
            modifiedOn: date,
            modifiedBy: req.body.modifiedBy
        }
    },
        { new: true })
        .exec()
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}