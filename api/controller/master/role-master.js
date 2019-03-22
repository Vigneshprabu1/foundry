/* Import Mongoose */ 
const mongoose = require('mongoose'); 

/*Import Role Master Schema*/
const RoleMaster = require('../../model/master/role-master');
const dateTime = require('node-datetime');


/* Get All Role Master */
exports.get_role_master= (req,res) =>{
    RoleMaster.find()
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

/*  Save Role Master */
exports.save_role_master = (req, res, next) => {
/*Get Current Date and Time */
    const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S');
    const roleMaster = new RoleMaster({
        _id: new mongoose.Types.ObjectId(),
       role: req.body.role,
        status:'A',
        createdOn: date,
        createdBy: req.body.createdBy,
    });
    roleMaster.save()
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
}


/*Update role Master */
exports.update_role_master = (req, res, next) => {
    /*Get Current Date and Time */
    const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S');
    RoleMaster.findByIdAndUpdate({ _id: req.body._id }, {
        $set: {
           role: req.body.role,
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
exports.delete_role_master = (req,res) =>{
     /*Get Current Date and Time */
     const dt = dateTime.create();
     const date = dt.format('Y-m-d H:M:S');
     RoleMaster.findByIdAndUpdate({ _id: req.body._id }, {
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