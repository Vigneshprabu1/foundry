/* Import Mongoose */ 
const mongoose = require('mongoose'); 

/*Import Item Master Type Schema*/
const ItemTypeMaster = require('../../model/master/item-type-master');
const dateTime = require('node-datetime');


/* Get All Item Type Master */
exports.get_item_type_master= (req,res) =>{
    ItemTypeMaster.find()
    .where('status')
    .equals('A')
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

/*  Save Item Type Master */
exports.save_item_type_master = (req, res, next) => {
/*Get Current Date and Time */
    const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S');
    const itemTypeMaster = new ItemTypeMaster({
        _id: new mongoose.Types.ObjectId(),
       itemType: req.body.itemType,
       stockType:req.body.stockType,
        status:'A',
        createdOn: date,
        createdBy: req.body.createdBy,
    });
    itemTypeMaster.save()
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
}


/*Update Item Type Master */
exports.update_item_type_master = (req, res, next) => {
    /*Get Current Date and Time */
    const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S');
    ItemTypeMaster.findByIdAndUpdate({ _id: req.body._id }, {
        $set: {
           itemType: req.body.itemType,
           stockType:req.body.stockType,
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


exports.delete_item_type_master = (req,res) =>{
     /*Get Current Date and Time */
     const dt = dateTime.create();
     const date = dt.format('Y-m-d H:M:S');
     ItemTypeMaster.findByIdAndUpdate({ _id: req.body._id }, {
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