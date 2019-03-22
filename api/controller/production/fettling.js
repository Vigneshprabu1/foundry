/* 
module Name: Production
sub-module Name:Fettling
*/

/* modules*/
const mongoose = require('mongoose');
const dateTime = require('node-datetime');
/* models */
const Fettling = require('../../model/production/fettling');
const knockOut = require('../../model/production/knock-out');
const OnGoingMelt = require('../../model/production/onGoing-Melt');
const ReturnAndRejection = require('../../model/production/return-and-rejection');
const MeltReport = require('../../model/production/melt');
const LabourMaster=require('../../model/master/labour-master');

/* controller*/
const FettlingMasterController = require('../../controller/master/fettling-master');
const KnockOutController = require('../../controller/production/knock-out');
const YieldController = require('../../controller/production/yield-weight-controller');
const LabourController = require('../../controller/master/labour-master');
const EmployeeController = require('../../controller/employee');
const OngoingMeltController=require('../../controller/production/onGoing-Melt');
const StockController=require('../../controller/stock');

/*Getting fettling info using batchId */
exports.fettling_get_using_batchId = (req, res) => {
    const batchId = req.params.batchId;
    Fettling.findOne({ 'batchId': batchId })
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json(err);
        });
}

/* Fettling Save Method */
exports.fettling_save = (req, res) => {
    /* import Date and Time */
    const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S'); 
    const fettling = new Fettling({
        _id: new mongoose.Types.ObjectId(),
        meltNo: req.body.meltNo,
        batchId: req.body.batchId,
        partId: req.body.partId,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        paintingType: req.body.paintingType,
        machineId: req.body.machineId,
        consumable:req.body.consumable,
        totalWorkingHours: req.body.totalWorkingHours,
        otHours: req.body.otHours,
        moldType:req.body.moldType,
        createdOn: date,
        createdBy: req.body.createdBy
    });
    fettling.save()
        .then((result) => {
            OnGoingMelt.updateOne({ batchId: result.batchId }, {
                $set: {
                    fettling: result._id,
                    currentStatus:'Fettling',
                    modifiedOn: date,
                    modifiedBy: req.body.modifiedBy
                }
            }, { new: true })
                .exec()
                .then(doc => {
                    var result2 = JSON.stringify(result);
                    /* yield calculation method */
                    YieldController.yieldWeightEntry(req, res, result);
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    });
                });

        })
        .catch(err => {
            res.status(500).json(err);
        });
}

/* update method using ObjectId */
exports.fettling_update = (req, res, next) => {
  
    var typeOfCost = null;
    var perCost = 0;
    var labourCost = 0.0;
    var consumableCost = 0.0;
    var totalCost = 0.0;
    var quantity = 0.0;
    var employeeName = null;
    var type = 'Fettling';
    console.log('requst',req.body.consumable);
    if (req.body.consumable.length > 0) {
        /* finding the quantity of particular batchId from knockoutcontroller*/
        KnockOutController.find_knockout_batchId(req.body.batchId)
            .then(knockOutResult => {
                // console.log('knockOutResult', knockOutResult);
                quantity = knockOutResult.quantity;
                var indWeight = knockOutResult.roughCastingWeight;
                var weight = Number(indWeight) * Number(quantity);
                var totalWorkingHours = 0.0;
                var otHours = 0.0;
                /* total working hours calculation*/
                for (var j = 0; j < req.body.consumable.length; j++) {
                    if (req.body.consumable[j].totalWorkingHours || req.body.consumable[j].otHours) {
                        totalWorkingHours = Number(totalWorkingHours) + Number(req.body.consumable[j].totalWorkingHours);
                        otHours = Number(otHours) + Number(req.body.consumable[j].otHours);
                    }
                }
                console.log('working hours final', totalWorkingHours, 'ot hours', otHours);

                /* Labour cost calculation*/
                LabourController.labourCostCalculation(req, res, type, weight, quantity, totalWorkingHours, otHours)
                    .then(labourResult => {
                        for (var i = 0; i < labourResult.length; i++) {
                            labourCost = labourResult[0];
                            perCost = labourResult[1];
                            typeOfCost = labourResult[2];
                        }
                        if (labourCost == null) {
                            /* employee cost calcualtion */
                            employee_cost_calculation(req,res,req.body.consumable, quantity);
                            res.status(200).json({
                                "message": "success"
                            });
                        }
                        else {
                            /* consumable cost calculation*/
                            consumable_cost_calculation(req, res, labourCost, quantity);
                            res.status(200).json({
                                "message": "success"
                            })

                        }
                    });
            });
    }
    else {
        fetting_update(req, res, id, labourCost, consumableCost, totalCost, perCost, quantity)
            .then(doc => {
                res.status(200).json(doc);
            });
    }

};


/* consumable cost calcualtion fucntion  */
async function consumable_cost_calculation(req, res, labourCost, quantity) {
    var consumableCost = 0.0;
    req.body.consumable.forEach(element => {
        consumableCost = Number(consumableCost) + Number(element.perKgCost) * Number(element.weight);
        /* stock updation*/
        StockController.stock_updation(element.consumableName, element.weight);
    });
    console.log('finished', consumableCost);
    /* total cost calculation */
    totalCost = Number(labourCost) + Number(consumableCost);
    perCost = Number(totalCost) / Number(quantity);

    /* fettling update function */
    fetting_update(req, res, labourCost, consumableCost, totalCost, perCost, quantity);

}


/* fettling update*/
async function fetting_update(req, res, labourCost, consumableCost, totalCost, perCost, quantity) {
    const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S');
    const id = req.params._id;
    var updateData;
    var data = await Fettling.findByIdAndUpdate({ _id: id }, {
        $set: {
            meltNo: req.body.meltNo,
            batchId: req.body.batchId,
            partId: req.body.partId,
            startTime: req.body.startTime,
            endTime: req.body.endTime,
            machineId: req.body.machineId,
            consumable:req.body.consumable,
            totalWorkingHours: req.body.totalWorkingHours,
            otHours: req.body.otHours,
            totalCost: totalCost.toFixed(2),
            perCost: perCost.toFixed(2),
            labourCost: labourCost.toFixed(2),
            consumableCost: consumableCost.toFixed(2),
            quantity: quantity,
            modifiedOn: date,
            modifiedBy: req.body.modifiedBy
        }
    },
        { new: true })
        .exec()
        .then(doc => {
            updateData = doc;
            return updateData;
        })
    return updateData;

}

/* check fettling  process completed to particulaer batchId */
exports.fettling_check = (req, res) => {
    const meltNo = req.params.meltNo;
    Fettling.find({ 'meltNo': meltNo, "endTime": { $exists: true }, "paintingType": { $ne: 'NO' } })
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}

async function find_fettling(req, res, batchId) {
    console.log('fettling', batchId);
    var result;
    await Fettling.findOne({ 'batchId': batchId, "endTime": { $ne: null } })
        .exec()
        .then((results) => {
            console.log('result', results)
            result = results;
        })
    return result;
}


/* employee cost calculation */
async function employee_cost_calculation(req,res,consumable,quantity) {
    var workinghours;
    var labourcost = 0;
    for (var i = 0; i < consumable.length; i++) {
        workinghours = consumable[i].totalWorkingHours;
        /* find the employee id from labour master using machineId */
        await LabourMaster.findOne({ 'machineId': consumable[i].machineId })
            .exec()
            .then(val => {
                if (workinghours != undefined) {
                    /* employee cost calculation from emploee master using employeeId and working hours */
                    EmployeeController.employee_cost_calculation(val.employeeId, workinghours).then(data => {
                        labourcost = Number(labourcost) + Number(data);
                        if(i==consumable.length){
                            console.log('cost final',labourcost);
                            consumable_cost_calculation(req, res, labourcost, quantity);
                        }

                    });
                }
            });
    }
}



module.exports.find_fettling = find_fettling;