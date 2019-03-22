/*
* module name: production
* sub-module name: melting
*/

/* import module */
const mongoose = require('mongoose');
const dateTime = require('node-datetime');

/* model */
const Melting = require('../../model/production/melting');
const OnGoingMelt = require('../../model/production/onGoing-Melt');
const Melt = require('../../model/production/melt');

/* controller */
const MouldingController = require("./moulding");
const MeltController = require('./Melt');
const LpgMasterController = require('../master/lpg-master');
const LabourMasterController = require('../master/labour-master');


/* getting the  melting details from database using meltNo */
exports.get_melting = (req, res, next) => {
    const meltNo = req.params.meltNo;
    Melting.findOne({ 'meltNo': meltNo })
        .exec()
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {
            res.status(500).json(err);
        });
};

/* save method */
exports.melting_save = (req, res, next) => {
    /* Getting the current time and date */
    var dt = dateTime.create();
    var date = dt.format('Y-m-d H:M:S');
    const melting = new Melting({
        _id: new mongoose.Types.ObjectId(),
        meltNo: req.body.meltNo,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        peakTemp: req.body.peakTemp,
        endTemp: req.body.endTemp,
        totalWorkingHours: req.body.totalWorkingHours,
        otHours: req.body.otHours,
        createdOn: date,
        createdBy: req.body.createdBy
    });
    melting.save()
        .then(result => {
            MeltController.find_melt(result.meltNo).then(docs => {
                OnGoingMelt.updateMany({ meltId: docs._id }, {
                    $set: {
                        melting: result._id,
                        currentStatus:'Melting',
                        modifiedOn: date,
                        modifiedBy: req.body.modifiedBy
                    }
                }, { new: true })
                    .exec()
                    .then(doc => {
                        res.status(200).json(result);
                    })
                    .catch(err => {
                        res.status(500).json(err);
                    });
            });
        })
        .catch(err => {
            res.status(500).json(err);
        })

};

/* updation method */
exports.update_melting = (req, res, next) => {
    const id = req.params._id;
    /*  function  for getting melt weight from melting*/
    MeltController.find_melt(req.body.meltNo).then(docs => {
        console.log
        var type = "Melting";
        var weight = docs.totalMeltWeight;
        var labourCost = 0.0;
        var typeOfCost = null;
        var perCost = 0.0;
        var quantity;
        if (req.body.totalWorkingHours != null) {
            OnGoingMelt.aggregate([
                {

                    $match:
                        { meltId: docs._id }
                },
                {

                    $group:
                        {
                            _id: null,
                            quantity: { $sum: "$quantity" },

                        }
                }
            ])
                .exec()
                .then(result => {
                    result.forEach(element => {
                        quantity = element.quantity;
                    });
                    /* function for  labour cost calculation*/
                    LabourMasterController.labourCostCalculation(req, res, type, weight, quantity,req.body.totalWorkingHours,req.body.otHours).then(val => {
                        console.log("finished ", val);
                        for (var i = 0; i < val.length; i++) {
                            labourCost = val[0];
                            perCost = val[1];
                            typeOfCost = val[2];
                        }
                        if(labourCost==null){
                            console.log('employee');
                               /* getting employee id from labour master */
                               LabourController.get_labour(type)
                               .then(result => {
                                var totalWorkingHours=Number(req.body.totalWorkingHours)+Number(req.body.otHours);

                                   /* employee cost calculation*/
                                   EmployeeController.employee_cost_calculation(result.employeeId, totalWorkingHours)
                                       .then(empResult => {
                                           labourCost = empResult;
                                           perCost=Number(labourCost)/Number(quantity);
                                           typeOfCost='HOUR'
                                           /* melting update function*/
                                      meltingUpdation(req, res, labourCost, typeOfCost, id, perCost);

                                       });
                               });
            
                        }else{
                           /* melting update function*/
                        meltingUpdation(req, res, labourCost, typeOfCost, id, perCost);

                        }
                    })
                });
        } else {
            /* melting update function*/
            meltingUpdation(req, res, labourCost, typeOfCost, id, perCost);
        }
    })

};

function meltingUpdation(req, res, labourCost, typeOfCost, id, perCost) {
    /* Getting the current time and date */
    var dt = dateTime.create();
    var date = dt.format('Y-m-d H:M:S');
    Melting.findByIdAndUpdate({ _id: id }, {
        $set: {
            meltNo: req.body.meltNo,
            startTime: req.body.startTime,
            endTime: req.body.endTime,
            peakTemp: req.body.peakTemp,
            endTemp: req.body.endTemp,
            totalWorkingHours: req.body.totalWorkingHours,
            otHours: req.body.otHours,
            labourCost: labourCost.toFixed(2),
            typeOfCost: typeOfCost,
            perCost: perCost.toFixed(2),
            modifiedOn: date,
            modifiedBy: req.body.modifiedBy
        }
    },
        { new: true })
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json(err);
        })
}
