const Vendor = require('../model/vendor');
const mongoose = require('mongoose');
const dateTime = require('node-datetime');

/** get all venndors */
exports.vendor_get_all = (req, res, next) => {
    Vendor.find()
        .where('status')
        .equals('A')
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

exports.get_vendor = (req, res, next) => {
    Vendor.findOne({'vendorName':req.params.vendorName})
        .where('status')
        .equals('A')
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
/**save vendor details */
exports.vendor_saves = (req, res, next) => {
    const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S')
    const vendor = new Vendor({
        _id: new mongoose.Types.ObjectId(),
        vendorName: req.body.vendorName,
        vendorType: req.body.vendorType,
        mobile: req.body.mobile,
        email: req.body.email.toLowerCase(),
        address: req.body.address,
        preferredType: req.body.preferredType,
        createdOn: date,
        createdBy: req.body.createdBy,
        status: 'A'
    });
    vendor.save()
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}

/**vendor details updation */
exports.vendor_updation = (req, res, next) => {
    const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S');
    Vendor.findByIdAndUpdate({ _id: req.body._id }, {
        $set: {
            vendorName: req.body.vendorName,
            vendorType: req.body.vendorType,
            mobile: req.body.mobile,
            email: req.body.email.toLowerCase(),
            address: req.body.address,
            preferredType: req.body.preferredType,
            modifiedOn: date,
            modifiedBy: req.body.modifiedBy
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

/**  delete vendor details*/
exports.vendor_delete = (req, res, next) => {
    const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S')
    Vendor.findByIdAndUpdate({ _id: req.body._id }, {
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
            })
        })
}

/**save vendor details */
async function vendor_save(req, res, next) {
    const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S');
    var vendorRes;
    const vendor = new Vendor({
        _id: new mongoose.Types.ObjectId(),
        vendorName: req.body.vendor.vendorName,
        vendorType: req.body.items.itemType,
        mobile: req.body.vendor.mobile,
        email: req.body.vendor.email.toLowerCase(),
        address: req.body.vendor.address,
        createdOn: date,
        createdBy: req.body.createdBy,
        status: 'A'
    });
    var s = await vendor.save()
        .then(doc => {
            vendorRes = doc;
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
    return vendorRes;
}


/**vendor details updation */
async function vendor_update(req, res, next) {
    const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S');
    var vendor;
    var s = await Vendor.findByIdAndUpdate({ _id: req.body.vendor._id }, {
        $set: {
            vendorName: req.body.vendor.vendorName,
            vendorType: req.body.items.itemType,
            mobile: req.body.vendor.mobile,
            email: req.body.vendor.email.toLowerCase(),
            address: req.body.vendor.address,
            modifiedOn: date,
            modifiedBy: req.body.modifiedBy
        }
    })
        .exec()
        .then(doc => {
            vendor = doc;
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
    return vendor;
}

/** get a vendor based on type */
exports.vendor_type_get = (req, res, next) => {
    Vendor.find({
        $and: [{ 'vendorType': req.params.itemType }, { 'status': 'A' }]
    })
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


/**get only the sand disposel vendors */
exports.vendor_get_sand_disposal = (req, res, next) => {
    Vendor.find({ 'vendorType': 'SandDisposal' })
        .exec()
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => {
            res.status(500).json({
                "message": "errrrrrr"
            })
        })
}

module.exports.vendor_save = vendor_save;
module.exports.vendor_update = vendor_update;