/* Import Mongoose */ 
const mongoose = require('mongoose'); 

/*Import item category Master Schema*/
const ItemCategoryMaster = require('../../model/master/item-category-master');
const dateTime = require('node-datetime');


/* Get All item category Master */
exports.get_item_category_master= (req,res) =>{
    ItemCategoryMaster.find()
    .where('status')
    .equals('A')
    .exec()
    .then(docs => {
        res.status(200).json(docs);
    })
    .catch(error => {
        res.status(500).json({
          error:err
        })
    })
}

/*  Save item category Master */
exports.save_item_category_master = (req, res, next) => {
/*Get Current Date and Time */
    const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S');
    const itemCategoryMaster = new ItemCategoryMaster({
        _id: new mongoose.Types.ObjectId(),
        itemCategory: req.body.itemCategory,
        status:'A',
        createdOn: date,
        createdBy: req.body.createdBy,
    });
    itemCategoryMaster.save()
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
}


/*Update item_category Master */
exports.update_item_category_master = (req, res, next) => {
    /*Get Current Date and Time */
    const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S');
    ItemCategoryMaster.findByIdAndUpdate({ _id: req.body._id }, {
        $set: {
            itemCategory: req.body.itemCategory,
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

/* Change the status from S To D */
exports.delete_item_category_master = (req,res) =>{
     /*Get Current Date and Time */
     const dt = dateTime.create();
     const date = dt.format('Y-m-d H:M:S');
     ItemCategoryMaster.findByIdAndUpdate({ _id: req.body._id }, {
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