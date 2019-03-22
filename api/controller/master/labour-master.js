const mongoose = require('mongoose');
//Schema
const LabourMaster = require('../../model/master/labour-master');
const Employee=require('../../model/employee');

/* controller */
const EmployeeController = require('../../controller/employee');



// import Datetime
const dateTime = require('node-datetime');


//Save Labour Master Details
exports.save_labour_master = (req, res) => {
    console.log('req.body',req.body);
    // Getting the current time and date
    var dt = dateTime.create();
    var date = dt.format('Y-m-d H:M:S');
    LabourMaster.find({$and:[{'activityName':req.body.activityName},{'status':'A'}]})
    .where('labourEmpType')
    .equals('Contract')
    .exec()
    .then(doc =>{
        console.log('doc',doc);
        if(doc.length == 0){
            const labourMaster = new LabourMaster({
                _id: new mongoose.Types.ObjectId(),
                activityName: req.body.activityName,
                labourEmpType: req.body.labourEmpType,
                workingType: req.body.workingType,
                ratePerKg: req.body.ratePerKg,
                ratePerHour: req.body.ratePerHour,
                otHours: req.body.otHours,
                employeeName: req.body.employeeName,
                employeeId:req.body.employeeId,
                paintingType:req.body.paintingType,
                machineId:req.body.machineId,
                createdOn: date,
                createdBy: req.body.createdBy,
                status:'A',
            });
            labourMaster.save()
                .then(docs => {
                    res.status(200).json(docs);
                })
                .catch(error => {
                    res.status(500).json({
                        "message": "errorrrr"
                    })
                })
              
            }
            else {
                res.status(500).json({
                    error: err
                })
            }
        })

            .catch(err => {
                res.status(500).json({
                    error: err
                })
            })   
        }
             
      


//get cONTRACT Labour Master Details
exports.get_contract_labour_master = (req, res) => {
    LabourMaster.find({'status':'A'})
    .where('labourEmpType')
    .equals('Contract')
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

//get permanent Labour Master Details
exports.get_permanent_labour_master = (req, res) => {
    LabourMaster.find({'status':'A'})
    .where('labourEmpType')
    .equals('Permanent')
        .exec()
        .then(docs => {
            console.log(' permanent docs',docs);
            res.status(200).json(docs);
        })
        .catch(error => {
            res.status(500).json({
                "message": "errorrrr"
            })
        })

}


exports.update_labour_master=(req,res) =>{
      /*Get Current Date and Time*/
    var dt = dateTime.create();
    var date = dt.format('Y-m-d H:M:S');
   
            LabourMaster.findByIdAndUpdate({ '_id': req.body._id }, {
                $set: {
                    activityName: req.body.activityName,
                    labourEmpType: req.body.labourEmpType,
                    workingType: req.body.workingType,
                    ratePerKg: req.body.ratePerKg,
                    ratePerHour: req.body.ratePerHour,
                    otHours: req.body.otHours,
                    employeeName: req.body.employeeName,
                    employeeId:req.body.employeeId,
                    paintingType:req.body.paintingType,
                    machineId:req.body.machineId,
                    modifiedOn: date,
                    modifiedBy: req.body.modifiedBy
                }
            },
                { new: true })
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
       

/* Change the status from S To D */
exports.delete_labour_master = (req,res) =>{
    /*Get Current Date and Time */
    const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S');
    LabourMaster.findByIdAndUpdate({ _id: req.body._id }, {
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



/** Labour Calculation */
async function labourCostCalculation(req, res,type, weight, noOfPieces,totalWorkingHours,otHours) {
 console.log('type',type,weight,totalWorkingHours,otHours);
    var workingHours = 0;
    var otHours = 0;
    var labourCost1 = 0;
    var perCost = 0;
    var typeOfCost = null;
    if (totalWorkingHours != null) {   
        await LabourMaster.findOne({$and:[{'activityName':type},{'status':'A'}]})
            .exec()
            .then(docs => {
                console.log('labourresult',docs);
                var labourEmpType=docs.labourEmpType;
                if(labourEmpType=='Contract'){
                      
                if (docs.workingType == 'KG') {
                    labourCost1 = Number(weight) * Number(docs.ratePerKg);
                    perCost = Number(labourCost1) / Number(weight);
                    typeOfCost = docs.workingType;
                    return [labourCost1, perCost, typeOfCost];
                }
                else if (docs.workingType == 'HOUR') {
                    workingHours= Number(totalWorkingHours) * Number(docs.ratePerHour);
                    if(otHours){
                        otHours = Number(otHours) * Number(docs.otHours);
                    }else {
                        otHours = 0;
                    }
                    labourCost1 = workingHours + otHours;
                    perCost = Number(labourCost1) / Number(noOfPieces);
                    typeOfCost = docs.workingType;
                    return [labourCost1, perCost, typeOfCost];
                }

                }else{
                   labourCost1=null;

               }
             
            });
    }
    return [labourCost1, perCost, typeOfCost];
}



/* getting employee name using machineId */

async function get_employee_id(machineId) {
    console.log('machine id',machineId);
    var id;
    await LabourMaster.findOne({$and:[{'machineId':machineId},{'status':'A'}]})
    .exec()
    .then(labourResult=>{
        id=labourResult.employeeId;
       return id;

    });
  return id;
    
}


/* getting employee name for painting using painting type */

async function get_employee_id_paint(paintingType)  {
    var id;
    await LabourMaster.findOne({$and:[{'paintingType':paintingType},{'status':'A'}]})
    .exec()
    .then(labourResult=>{
        id=labourResult.employeeId;
       return id;

    });
  return id;
    
}

/* Get labour master using activity Type*/
exports.get_labour_master_using_activity_type=(req,res) =>{
    const activityType=req.params.type;

    get_labour(activityType)
    .then(docs =>{
        res.status(200).json(docs);
    })
    .catch(err =>{
        res.status(500).json({
            error:err
        });
    })
}

/* labour master details */
async function get_labour(type){
    var result= await LabourMaster.findOne({'activityName':type})
    .where('status')
    .equals('A')
    .exec();
    return result;

}


module.exports.get_employee_id=get_employee_id;
module.exports.get_employee_id_paint=get_employee_id_paint;
module.exports.labourCostCalculation=labourCostCalculation;
module.exports.get_labour=get_labour;

