const mongoose = require('mongoose');
const MachineDetails = require('../../model/master/machine-details');
const dateTime = require('node-datetime');

/** gat all machine details */
exports.get_machine_details = (req, res, next) => {
    MachineDetails.find()
    .where('status')
    .equals('A')
    .exec()
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}

/** asave_machine_details */
exports.save_machine_details = (req, res, next) => {
     const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S');
    const machineDetails = new MachineDetails({
        _id: new mongoose.Types.ObjectId(),
        activityType: req.body.activityType, 
        machineId:req.body.machineId,
        machineName:req.body.machineName,
        paintingType: req.body.paintingType,
        machineStatus:req.body.machineStatus,      
        createdOn: date,
        createdBy: req.body.createdBy,
        status:'A'
    });
    machineDetails.save()
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}

/** update_machine_details*/
exports.update_machine_details = (req, res, next) => {
    const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S');
    MachineDetails.findByIdAndUpdate({ _id: req.body._id }, {
        $set: {
            activityType: req.body.activityType,
            machineId:req.body.machineId,
            machineName:req.body.machineName,
            paintingType: req.body.paintingType,
            machineStatus:req.body.machineStatus,      
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
            });
        });
}

/** delete_machine_details */
exports.delete_machine_details = (req, res, next) => {
    const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S');
    MachineDetails.findByIdAndUpdate({ _id: req.body._id }, {
        $set: {
            modifiedOn: date,
            modifiedBy: req.body.modifiedBy,
            status: 'D'
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

/* Get  Machine Details Details  by activity Type*/
exports.get_machine_details_by_activity_type=(req,res) =>{
    MachineDetails.find({$and:[{'activityType':req.params.type},{'status':'A'}]})
    .where('machineStatus')
    .equals('Active')
    .exec()
    .then(docs =>{
        console.log('docs activityType',docs);
        res.status(200).json(docs);
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
}