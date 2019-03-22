/*
Module Name: Shot Blasting
Sub Module Name: Shot Blasting
*/


/*  Imported Modules*/
const mongoose = require('mongoose');
/* import Datetime */
const dateTime = require('node-datetime');

/* Models*/
const ShotBlasting = require('../../model/production/shot-blasting-detail');
const OnGoingMelt = require('../../model/production/onGoing-Melt');
const ShotBlastingMaster = require('../../controller/master/shot-blasting-master');
const LabourMaster = require('../../model/master/labour-master');

/* controller */
const KnockOutController = require('../../controller/production/knock-out');
const LabourController = require('../../controller/master/labour-master');
const MouldingController = require('../../controller/production/moulding');
const EmployeeController = require('../../controller/employee');
const OngoingMeltController = require('../../controller/production/onGoing-Melt');
const StockController = require('../../controller/stock');


/*Save Shot Blasting Details */
exports.shot_blasting_detail_save = (req, res) => {
    /* Get Current Date and Time*/
    const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S');

    /* getting mold type from ongoing melt using batchId */

    const shotBlasting = new ShotBlasting({
        _id: new mongoose.Types.ObjectId(),
        meltNo: req.body.meltNo,
        partId: req.body.partId,
        batchId: req.body.batchId,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        machineId: req.body.machineId,
        totalWorkingHours: req.body.totalWorkingHours,
        otHours: req.body.otHours,
        consumable: req.body.consumable,
        //shotsUsedInWeight: req.body.shotsUsedInWeight,
        moldType: req.body.moldType,
        createdOn: date,
        createdBy: req.body.createdBy
    });
    shotBlasting.save()
        .then(result => {
            OnGoingMelt.updateOne({ batchId: result.batchId }, {
                $set: {
                    shotblasting: result._id,
                    currentStatus:'ShotBlasting',
                    modifiedOn: date,
                    modifiedBy: req.body.modifiedBy
                }
            }, { new: true })
                .exec()
                .then(doc => {
                    res.status(200).json(result);
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    });
                });
        })
        .catch((err) => {
            res.status(500).json(err);
        });
};

/*get particular data from DB using BatchId*/
exports.shot_blasting_detail_get_particular = (req, res, next) => {
    const batchId = req.params.shotBlastingBatchId;
    console.log(batchId);
    ShotBlasting.findOne({ batchId: batchId })
        .exec()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            res.status(500).json({
                message: 'There is an Error'
            });
        });

};
/* Shot Blasting Update Method */
exports.shot_blasting_detail_update = (req, res, next) => {
    console.log('update fucntion ');
    var totalCost = 0;
    var typeOfCost = null;
    var perCost = 0;
    var consumableCost = 0;
    var labourCost = 0.0;
    var quantity = 0.0;
    var type = "ShotBlasting";
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
        Shotblasting_update(req, res, quantity, labourCost, consumableCost, perCost, totalCost);
        res.status(200).json({
            "message": "success"
        })
    }

};


/* check whether shot blasting for all batch completed or not */
exports.shot_blasting_detail_check = (req, res) => {
    const meltNo = req.params.meltNo;
    ShotBlasting.find({ meltNo: meltNo, "endTime": { "$exists": true } })
        .exec()
        .then(docs => {
            console.log('shot_blasting_detail', docs);
            res.status(200).json(docs);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}

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

    /* shot blasting update function */
    Shotblasting_update(req, res, quantity, labourCost, consumableCost, perCost, totalCost);

}

/* Shot Blasting Update Function*/
async function Shotblasting_update(req, res, quantity, labourCost, consumableCost, perCost, totalCost) {
    //Get current DateTime  
    const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S');
    const id = req.params.shotblastingId;
    await ShotBlasting.findByIdAndUpdate({ _id: id }, {
        $set: {
            meltNo: req.body.meltNo,
            partId: req.body.partId,
            batchId: req.body.batchId,
            startTime: req.body.startTime,
            endTime: req.body.endTime,
            totalWorkingHours: req.body.totalWorkingHours,
            otHours: req.body.otHours,
            consumable: req.body.consumable,
            //shotsUsedInWeight: req.body.shotsUsedInWeight,
            quantity: quantity,
            labourCost: labourCost.toFixed(2),
            consumableCost: consumableCost.toFixed(2),
            totalCost: totalCost.toFixed(2),
            perCost: perCost.toFixed(2),
            modifiedOn: date,
            modifiedBy: req.body.modifiedBy
        }
    },
        { new: true })
        .exec()
        .then(result => {
            console.log('result', result);
        })

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

