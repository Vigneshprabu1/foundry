/* Import Mongoose */ 
const mongoose = require('mongoose'); 

/*Import Molding Master Schema*/
const MoldingMaster = require('../../model/master/molding-master');
const dateTime = require('node-datetime');


/* Get All Molding Master */
exports.get_molding_master= (req,res) =>{
    MoldingMaster.find()
    .where('status')
    .equals('A')
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

/*  Save Molding Master */
exports.save_molding_master = (req, res, next) => {
/*Get Current Date and Time */
    const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S');
    const moldingMaster = new MoldingMaster({
        _id: new mongoose.Types.ObjectId(),
       moldType: req.body.moldType,
        status:'A',
        createdOn: date,
        createdBy: req.body.createdBy,
    });
    moldingMaster.save()
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
}


/*Update molding Master */
exports.update_molding_master = (req, res, next) => {
    /*Get Current Date and Time */
    const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S');
    MoldingMaster.findByIdAndUpdate({ _id: req.body._id }, {
        $set: {
           moldType: req.body.moldType,
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
exports.delete_molding_master = (req,res) =>{
     /*Get Current Date and Time */
     const dt = dateTime.create();
     const date = dt.format('Y-m-d H:M:S');
     MoldingMaster.findByIdAndUpdate({ _id: req.body._id }, {
        $set: {
           status:'D',
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