
/* import module*/
const mongoose = require('mongoose');
const dateTime = require('node-datetime');

/* model */
const CoreMaking = require('../../model/production/core-making');
const Stock = require('../../model/stock');
const CoreDetails = require('../../model/production/core-details');
const OnGoingMelt=require('../../model/production/onGoing-Melt');
/* controller */
const ProductController = require('../../controller/product');
const LabourController = require('../../controller/master/labour-master');
const EmployeeController = require('../../controller/employee');
const OnGoingMeltController = require('../../controller/production/onGoing-Melt');
const StockController = require('../../controller/stock');


/* get current core making using batchId*/
exports.get_current_core_making_using_batchId = (req, res) => {
    get_core_making_using_batchId(req.params.batchId).then(docs => {
        console.log('get_current_core_making_using_batchId', docs);
        res.status(200).json(docs);
    })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}

/* update core making using _id */
exports.update_core_making = (req, res, next) => {
    var labourCost = 0.0;
    var consumableCost = 0.0;
    var totalCost = 0.0;
    var perCost = 0.0;
    var weight;
    var quantity;
    var totalWeight;
    if ((req.body.totalWeight != null || req.body.totalWeight != undefined) && (req.body.totalWorkingHours != null || req.body.totalWorkingHours != undefined)) {
        console.log('iffffff');
        var id = req.body._id;
        if (req.body.coreDetails != undefined) {
            save_core_details(req, res);
        }
        /* getting no.of.s from product using partId */
        OnGoingMeltController.find_with_batch_id(req.body.batchId)
            .then(result => {
                var type = 'Core-' + req.body.moldType;
                quantity = result.quantity;
                weight = req.body.totalWeight;
                totalWeight = Number(weight) * Number(quantity);
                /* labour calculation */
                LabourController.labourCostCalculation(req, res, type, totalWeight, quantity, req.body.totalWorkingHours, req.body.otHours)
                    .then(val => {
                        console.log('val', val)
                        for (var i = 0; i < val.length; i++) {
                            labourCost = val[0];
                            perCost = val[1];
                            typeOfCost = val[2];
                        }

                        if (labourCost == null) {
                            /* getting employee id from labour master */
                            LabourController.get_labour(type)
                                .then(result => {
                                    var totalWorkingHours = Number(req.body.totalWorkingHours) + Number(req.body.otHours);
                                    /* employee cost calculation*/
                                    EmployeeController.employee_cost_calculation(result.employeeId, totalWorkingHours)
                                        .then(empResult => {
                                            labourCost = empResult;
                                            /* consumable cost calculation */
                                            consumable_cost_calculation(req.body, labourCost, quantity)
                                                .then(result => {
                                                    res.status(200).json({
                                                        "message": "success"
                                                    });
                                                });

                                        });
                                });
                        } else {
                            /* consumable cost calculation */
                            consumable_cost_calculation(req, labourCost, quantity);
                            res.status(200).json({
                                "message": "success"
                            });
                        }
                    });
            });
    }
    else {
        if (req.body.coreDetails != undefined) {
            save_core_details(req, res);
        }
        core_making_update(req, labourCost, consumableCost, perCost, totalCost);
        res.status(200).json({
            "message": "success"
        });
    }


}


/* core making save */
function save_core_making(req, res, ongoingmelts, melt) {
    console.log('core_making_save', ongoingmelts, melt);
    const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S');
    const coreMaking = new CoreMaking({
        _id: new mongoose.Types.ObjectId(),
        meltNo: melt.meltNo,
        batchId: ongoingmelts.batchId,
        partId: ongoingmelts.partId,
        moldType: ongoingmelts.moldType,
        createdOn: date,
    });
    var result = coreMaking.save()
        .then(result => {
            OnGoingMelt.findOneAndUpdate({ batchId: result.batchId }, {
                $set: {
                    coremaking: result._id,
                    currentStatus:'CoreMaking',
                    modifiedOn: date,
                    modifiedBy: req.body.modifiedBy
                }
            }, { new: true })
                .exec()
                .then(doc => {
                   
                });
             

        })
        .catch(err => {
        });
    return result;
}


/* consuamble cost calculation function */
async function consumable_cost_calculation(req, labourCost, quantity) {
    var consumableCost = 0.0;
    for (var i = 0; i < req.body.coreDetails.length; i++) {
        await Stock.findOne({ 'itemName': req.body.coreDetails[i].coreType })
            .exec()
            .then(result => {
                consumableCost = Number(consumableCost) + (Number(result.perKG) * Number(req.body.coreDetails[i].coreWeight));
                /* core weight updation in stock */
                StockController.stock_updation(req.body.coreDetails[i].coreType, req.body.coreDetails[i].coreWeight);
                if (i == req.body.coreDetails.length - 1) {
                    console.log('finalize');
                    /* total cost calculation */
                    var totalCost = Number(labourCost) + Number(consumableCost);
                    var perCost = Number(totalCost) / Number(req.body.totalWeight);
                    core_making_update(req, labourCost, consumableCost, perCost, totalCost);
                }
            });
    }

}

/* update function  of core making */
async function core_making_update(req, labourCost, consumableCost, perCost, totalCost) {
    //Get current DateTime  
    console.log('etttdttdtd',req.body._id);
    const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S');
    await CoreMaking.findByIdAndUpdate({ _id:req.body._id }, {
        $set: {
            meltNo: req.body.meltNo,
            partId: req.body.partId,
            batchId: req.body.batchId,
            startTime: req.body.startTime,
            endTime: req.body.endTime,
            moldType: req.body.moldType,
            coreDetails: req.body.coreDetails,
            totalWeight: req.body.totalWeight,
            totalWorkingHours: req.body.totalWorkingHours,
            otHours: req.body.otHours,
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


function save_core_details(req, res) {
    //Get current DateTime  
    const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S');
    console.log('req.body', req.body.coreDetails);
    var coreDetails = req.body.coreDetails;
    CoreDetails.find({ batchId: req.body.batchId })
        .exec()
        .then(docs => {
            console.log('docs lenght', docs);
            if (docs.length == 0) {
                coreDetails.forEach(element => {
                    const coreDetails = new CoreDetails({
                        _id: new mongoose.Types.ObjectId(),
                        batchId: req.body.batchId,
                        coreType: element.coreType,
                        coreWeight: element.coreWeight,
                        createdOn: date
                    });
                    var result = coreDetails.save()
                        .then(result => {
                            console.log('core detail result ', result);
                        })
                        .catch(err => {
                        });
                });
            }
            else {
                coreDetails.forEach(element => {
                    CoreDetails.findByIdAndUpdate({ _id: element._id }, {
                        $set: {
                            coreType: element.coreType,
                            coreWeight: element.coreWeight,
                            modifiedOn: date
                        }
                    },
                        { new: true })
                        .exec()
                        .then(result => {
                            console.log('update coreDetails', result);
                        })
                        .catch(err => {
                        })
                })
            }
        })
}

async function get_core_making_using_batchId(batchId) {
    var result;
    await CoreMaking.find({ batchId: batchId })
        .exec()
        .then(docs => {

            console.log('CoreMaking batch result', docs);
            result = docs;
        })
    return result;
}
module.exports.save_core_making = save_core_making;