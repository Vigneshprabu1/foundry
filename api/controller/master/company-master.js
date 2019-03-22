const mongoose = require('mongoose');
const CompanyMaster = require('../../model/master/company-master');
const dateTime = require('node-datetime');

/** gat all company details */
exports.company_master_get_all = (req, res, next) => {
    CompanyMaster.find()
    .where('status')
    .equals('A')
    .exec()
        .then(docs => {
            res.status(200).json(docs)
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}

/** company master save */
exports.company_master_save = (req, res, next) => {
      const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S');
    const companyMaster = new CompanyMaster({
        _id: new mongoose.Types.ObjectId(),
        companyName: req.body.companyName,
        emailId: req.body.emailId,
        phoneNo: req.body.phoneNo,
        address: req.body.address,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        companyCode: req.body.companyCode,
        idProof: req.body.idProof,
        createdOn: date,
        createdBy: req.body.createdBy,
        status:'A'
    });
    companyMaster.save()
        .then(doc => {
            res.status(200).json(doc)
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}

/** company Master update */
exports.company_master_update = (req, res, next) => {
    const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S');
    CompanyMaster.findByIdAndUpdate({ _id: req.body._id }, {
        $set: {
            companyName: req.body.companyName,
            emailId: req.body.emailId,
            phoneNo: req.body.phoneNo,
            address: req.body.address,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            companyCode: req.body.companyCode,
            idProof: req.body.idProof,
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

/** delete company details */
exports.companyMaster_delete = (req, res, next) => {
    const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S');
    CompanyMaster.findByIdAndUpdate({ _id: req.body._id }, {
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