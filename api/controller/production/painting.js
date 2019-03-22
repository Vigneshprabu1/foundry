/*
* module name: production
* sub-module name: painting
*/

/* import module */
const mongoose = require('mongoose');
const dateTime = require('node-datetime');

/* model */
const Painting = require('../../model/production/painting');
const OnGoingMelt = require('../../model/production/onGoing-Melt');
const Moulding = require('../../model/production/moulding');
const CompletedMelt = require('../../controller/production/completed-melt');
const MeltController = require('../../controller/production/Melt');

/** Controller */
const OnGoingController = require('./onGoing-Melt');
const FettlingController = require('./fettling');
const EmployeeController = require('../../controller/employee');
const PaintingMasterController = require('../../controller/master/painting-master');
const KnockOutController = require('../../controller/production/knock-out');
const LabourController=require('../../controller/master/labour-master');




/* get painting information by using batchId */
exports.painting_get_with_batchId = (req, res, next) => {
    const batchId = req.params.batchId;
    Painting.findOne({ 'batchId': batchId })
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

/* save Painting details */
exports.painting_save = (req, res) => {
    // Getting the current time and date
    var dt = dateTime.create();
    var date = dt.format('Y-m-d H:M:S');
    const painting = new Painting({
        _id: new mongoose.Types.ObjectId(),
        meltNo: req.body.meltNo,
        batchId: req.body.batchId,
        partId: req.body.partId,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        paintingType:req.body.paintingType,
        totalWorkingHours: req.body.totalWorkingHours,
        otHours:req.body.otHours,
        createdOn: date,
        createdBy: req.body.createdBy
    });
    
    painting.save()
        .then(result => {
            OnGoingMelt.updateOne({ batchId: result.batchId }, {
                $set: {
                    painting: result._id,
                    currentStatus:'Painting',
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
        .catch(err => {
            res.status(500).json(err);
        });
}

/*update painting information  using objectId */
exports.painting_update = (req, res, next) => {
    const id = req.params._id;
    var labourCost = 0.0;
    var consumableCost = 0.0;
    var perLitreCost = 0.0;
    var perCost = 0.0;
    var quantity = 0.0;
    var totalCost = 0.0;
    var indWeight=0.0;
    var type='Painting';
    if(req.body.totalWorkingHours!=null){
          /* finding the quantity of particular batchId from knockoutcontroller*/
          KnockOutController.find_knockout_batchId(req.body.batchId)
          .then(knockOutResult => {
             // console.log('knockOutResult', knockOutResult);
              quantity = knockOutResult.quantity;
               indWeight=knockOutResult.roughCastingWeight;
              const weight = Number(indWeight) * Number(quantity);
                var otHours=0;
              if(req.body.otHours==undefined){
                otHours=0;

              }else{
                  otHours=req.body.otHours;
              }
              /* Labour cost calculation*/
              LabourController.labourCostCalculation(req, res,type, weight, quantity,req.body.totalWorkingHours,req.body.otHours)
              .then(labourResult=>{
                    
                      for (var i = 0; i <labourResult.length; i++) {
                          labourCost = labourResult[0];
                          perCost = labourResult[1];
                          typeOfCost = labourResult[2];
                         
                      }
                      if(labourCost==null){
                          /* employee cost calculation  */
                         LabourController.get_employee_id_paint(req.body.paintingType) 
                                          .then(val=>{
                                              console.log('value',val);
                                              EmployeeController.employee_cost_calculation(val,req.body.totalWorkingHours)
                                               .then(empResult => {
                                                   labourCost=empResult;
                                                   /* consumable cost calculation*/
                                                   consumable_cost_calculation(req,res,id,labourCost,quantity,indWeight);
                                                   res.status(200).json({
                                                    "message": "success"
                                                });
                   });
                  });
                      }
                      else{
                            /* consumable cost calculation*/
                          consumable_cost_calculation(req,res,id,labourCost,quantity,indWeight);
                          res.status(200).json({
                            "message": "success"
                        });

                      
                      }
              });
          });
   

    }
    else {
        console.log("else if");
        painting_update_async(req, res, id, quantity, labourCost, consumableCost, perCost);
        res.status(200).json({
            "message": "success"
        });


    }



}
async function  consumable_cost_calculation(req,res,id,labourCost,quantity,indWeight){
      /* consumable cost calculation */
      PaintingMasterController.get_painting_details_by_painting_type(req.body.paintingType,req.body.paintName)
      .then(result => {
          perLitreCost = result.perLitreCost;
          consumableCost = Number(req.body.totalPaint) * Number(perLitreCost);
                  totalCost = Number(labourCost) + Number(consumableCost);
                  perCost = Number(totalCost) / Number(quantity);
                  painting_update_async(req, res, id, quantity, labourCost, consumableCost, perCost);

      });

}


async function painting_update_async(req, res, id, quantity, labourCost, consumableCost, perCost) {
    // Getting the current time and date
    var dt = dateTime.create();
    var date = dt.format('Y-m-d H:M:S');
  Painting.findByIdAndUpdate({ _id: id }, {
      $set: {
          meltNo: req.body.meltNo,
          batchId: req.body.batchId,
          partId: req.body.partId,
          startTime: req.body.startTime,
          endTime: req.body.endTime,
          totalWorkingHours: req.body.totalWorkingHours,
          otHours:req.body.otHours,
          totalPaint: req.body.totalPaint,
          quantity: quantity,
          labourCost: labourCost.toFixed(2),
          consumableCost: consumableCost.toFixed(2),
          perCost:perCost.toFixed(2),
          paintingType:req.body.paintingType,
          paintName:req.body.paintName,
          modifiedOn: date,
          modifiedBy: req.body.modifiedBy
      }
  },
      { new: true })
      .exec()
      .then(doc => {
          console.log(doc);
          res.status(200).json(doc);
      })
      .catch(err => {
          res.status(500).json(err);
      })
}



/* Check painting completed product */
exports.painting_check = (req, res) => {
    const meltNo = req.params.meltNo;
    var length=0.0;
    Moulding.find({ 'meltNo': meltNo })
        .exec()
        .then((result) => {
            var noOfBatchs = result.length;
            result.forEach(element => {
                OnGoingController.ongoing_melt_find_batch_status(element.batchId)
                    .then(docs => {
                        if (docs.paintingType == 'NO') {
                            FettlingController.find_fettling(req, res, element.batchId)
                            .then(docs1 => {
                                if(docs1){
                                    length++;
                                    console.log('fettlings ',length);
                                    if(length ==  result.length){
                                        MeltController.batch_status_updation(meltNo).then(docs => {
                                            console.log('docs batchStatus', docs);
                                            res.status(200).json(docs);
                                        })
                                    }
                                }
                            });
                        } else {
                            find_painting(req, res, element.batchId).then(docs => {
                                if(docs){
                                    length++;
                                    if(length ==  result.length){
                                        MeltController.batch_status_updation(meltNo).then(docs => {
                                            console.log('docs batchStatus', docs);
                                            res.status(200).json(docs);
                                        })
                                    }
                                }
                            });
                        }
                       
                    })
                   
            });
        })
        .catch((err) => {
            res.status(500).json(err);

        });
}

/*this is the method for finding the meltno of  all batchid's also check those process completed or not using endTIme and 
batchStatus in melt document updated as completed */
async function find_painting(req, res, batchId) {
    var result;
     await Painting.findOne({ 'batchId': batchId, "endTime": { $ne: null } })
        .exec()
        .then((results) => {
           result = results; 
         })
    return result;
}
module.exports.find_painting = find_painting;

