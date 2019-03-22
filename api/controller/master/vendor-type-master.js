/* Import Mongoose */ 
const mongoose = require('mongoose'); 

/*Import Vendor  Master Type Schema*/
const VendorTypeMaster = require('../../model/master/vendor-type-master');
const dateTime = require('node-datetime');


/* Get All Vendor Type Master */
exports.get_vendor_type_master= (req,res) =>{
    VendorTypeMaster.find()
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

/*  Save Vendor Type Master */
exports.save_vendor_type_master = (req, res, next) => {
    console.log('req.body',req.body);
/*Get Current Date and Time */
    const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S');
    const vendorTypeMaster = new VendorTypeMaster({
        _id: new mongoose.Types.ObjectId(),
       vendorType: req.body.vendorType,
        status:'A',
        createdOn: date,
        createdBy: req.body.createdBy,
    });
    vendorTypeMaster.save()
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
}


/*Update Vendor Type Master */
exports.update_vendor_type_master = (req, res, next) => {
    /*Get Current Date and Time */
    const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S');
    VendorTypeMaster.findByIdAndUpdate({ _id: req.body._id }, {
        $set: {
           vendorType: req.body.vendorType,
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

/*Delete Vendor Type Master */
exports.delete_vendor_type_master = (req,res) =>{
     /*Get Current Date and Time */
     const dt = dateTime.create();
     const date = dt.format('Y-m-d H:M:S');
     VendorTypeMaster.findByIdAndUpdate({ _id: req.body._id }, {
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