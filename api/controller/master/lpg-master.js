/* Import Mongoose */
const mongoose = require('mongoose');

/*Import Lpg Master Schema*/
const LpgMaster = require('../../model/master/lpg-master');
const dateTime = require('node-datetime');


/* Get All Lpg Master */
exports.get_lpg_master = (req, res) => {
    console.log('get_lpg_master');
    LpgMaster.find()
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

/*  Save Lpg Master */
exports.save_lpg_master = (req, res, next) => {
    /*Get Current Date and Time */
    const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S');
    find_last_inserted_record().then(result =>{     
       if(result != undefined) {
        var id = result._id;
       update_bought_date(req,id).then(result1 =>{
       })    
    }   
    const lpgMaster = new LpgMaster({
        _id: new mongoose.Types.ObjectId(),
        boughtDate: req.body.boughtDate,
        totalCost: req.body.totalCost,
        noOfHours: req.body.noOfHours,
        perHourCost:(Number(req.body.totalCost)/Number(req.body.noOfHours)).toFixed(3),
        createdOn: date,
        createdBy: req.body.createdBy,
    });
    lpgMaster.save()
        .then(doc => {                   
            res.status(200).json(doc);           
        })
        .catch(err => {         
            res.status(500).json({
                error: err
            })
        });
})
.catch(err => {         
    res.status(500).json({
        error: err
    })
});
}


/*Update Lpg  Master */
exports.update_lpg_master = (req, res, next) => {
    /*Get Current Date and Time */
    const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S');
    LpgMaster.findByIdAndUpdate({ _id: req.body._id }, {
        $set: {
            boughtDate: req.body.boughtDate,
            totalCost: req.body.totalCost,
            noOfHours: req.body.noOfHours,
            perHourCost:(Number( req.body.totalCost)/Number(req.body.noOfHours)).toFixed(3),
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

/* Delete Lpg Master */
exports.delete_lpg_master = (req, res) => {
    /*Get Current Date and Time */
    const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S');
    LpgMaster.findByIdAndDelete({ _id: req.body._id })
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


/* lpg master cost calculation */
async function lpg_master_calculation(req, res) {
    var consumableCost = 0.0;
    var totalWorkingHours = req.body.totalWorkingHours;
    if (totalWorkingHours != null) {
        /* finding the sum of cost and hours of lpg master */
        await LpgMaster.aggregate([

            {
                $group:
                    {
                        _id: null,
                        totalCost: { $sum: "$totalCost" },
                        totalWorkingHoursLpg: { $sum: "$noOfHours" }
                    }
            }
        ])
            .exec()
            .then(result => {
                var totalCost;
                var totalHours;
                result.forEach(element => {
                    totalCost = element.totalCost;
                    totalHours = element.totalWorkingHoursLpg;

                });
                console.log('totalCost', totalCost, 'totalHours', totalHours);
                var perHourCost = Number(totalCost) / Number(totalHours);
                if (req.body.otHours) {

                    totalWorkingHours = Number(req.body.otHours) + Number(totalWorkingHours);

                }
                consumableCost = Number(totalWorkingHours) * Number(perHourCost);
                console.log('consumableCost', consumableCost);
                return consumableCost;


            })

    }
    return consumableCost;
}

async function find_last_inserted_record(){
    var result = await LpgMaster.findOne().sort({_id:-1}).limit(1)
    .exec()
    .then(docs =>{   
        return docs;
    })
    .catch(err =>{
    })
    return result;
}



function update_bought_date(req,id){
      /*Get Current Date and Time */
      const dt = dateTime.create();
      const date = dt.format('Y-m-d H:M:S');
    var docs = LpgMaster.findByIdAndUpdate({'_id':id},{
        $set:{
            replaceDate:req.body.boughtDate,
            modifiedOn:date
        }
        },
        {new:true})
        .exec()
        .then(docs =>{
        })
        return docs;
    }

module.exports.find_last_inserted_record = find_last_inserted_record;
module.exports.lpg_master_calculation=lpg_master_calculation;
