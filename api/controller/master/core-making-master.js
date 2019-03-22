/* imported module */
const mongoose = require('mongoose');
const dateTime = require('node-datetime');

/* model*/
const CoreMakingMaster=require('../../model/master/core-making-master');

/* getting all details*/
exports.get_all_core_making_master=(req,res,next)=>{
                 CoreMakingMaster.find()
                 .exec()
                 .then(result=>{
                     res.status(200).json(result);
                 })
                 .catch(err=>{
                     res.status(500).json({
                        error: err
                         
                     });
                 });
}

/* master details save method*/
exports.save_core_masking_master=(req,res,next)=>{
    const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S');

    const coreMakingMaster=new CoreMakingMaster({
        _id:new mongoose.Types.ObjectId(),
        coreType:req.body.coreType,
        moldType:req.body.moldType,
        status: req.body.status,
        createdOn: date,
        createdBy: req.body.createdBy,

    });
    coreMakingMaster.save()
    .then(result=>{
        res.status(200).json(result);
    })
    .catch(err=>{
        res.status().json({
            error:err
        });
    });

}

/* update the master details*/
exports.update_core_making_master=(req,res,next)=>{
    const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S');
    CoreMakingMaster.findByIdAndUpdate({ _id: req.body._id }, {
        $set: {
            coreType:req.body.coreType,
            moldType:req.body.moldType,
            status: req.body.status,
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

/** delete core making master  details */
exports.delete_core_making_master = (req, res, next) => {
    const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S');
    CoreMakingMaster.findByIdAndUpdate({ _id: req.body._id }, {
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

/*get_core_master_by_mold_type */
exports.get_core_master_by_mold_type=(req,res)=>{
    get_core_type(req.params.moldType).then(docs =>{
        console.log('get_core_master_by_mold_type',docs);
        res.status(200).json(docs);
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    }) 
}

async function get_core_type(moldType) {
  var result=await  CoreMakingMaster.find({'moldType':moldType})
  .where('status')
  .equals('Active')
    .exec()
    return result;
   
}

module.exports.get_core_type=get_core_type;