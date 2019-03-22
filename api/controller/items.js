const Items = require('../model/items');
const mongoose = require('mongoose');
const dateTime = require('node-datetime');

/**get all items */
exports.items_get_all = (req, res, next) => {
    Items.find()
        .exec()
        .then(docs => {
            res.status(200).json(docs)
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}

exports.items_all = (req, res, next) => {
    Items.find({ 'status': 'Active', "itemCategory": { $ne: 'Return' } })
        .exec()
        .then(docs => {
            res.status(200).json(docs)
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}
exports.get_items_by_name = (req, res, next) => {
    Items.findOne({ 'itemName': req.params.itemName })
        .where('status')
        .equals('Active')
        .exec()
        .then(docs => {
            res.status(200).json(docs)
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}

exports.get_items_by_itemTypes = (req, res, next) => {
    Items.find({ $or: [{ 'itemType': 'RawMaterial' }, { 'itemType': 'Consumable' }] })
        .where('status')
        .equals('Active')
        .exec()
        .then(docs => {
            res.status(200).json(docs)
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}
/** save item details */
exports.item_save = (req, res, next) => {
    const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S');
    const items = new Items({
        _id: new mongoose.Types.ObjectId(),
        itemName: req.body.itemName,
        itemType: req.body.itemType,
        unit: req.body.unit,
        gst: req.body.gst,
        itemCategory: req.body.itemCategory,
        stockType: req.body.stockType,
        perQtyWeight: req.body.perQtyWeight,
        minWeightReq: req.body.minWeightReq,
        createdOn: date,
        createdBy: req.body.createdBy,
        status: req.body.status
    });
    items.save()
        .then(doc => {
            res.status(201).json(doc)
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
}

/** item details updation */
exports.item_update = (req, res, next) => {
    const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S');
    console.log(req.body);
    Items.findByIdAndUpdate({ _id: req.body._id }, {
        $set: {
            itemName: req.body.itemName,
            itemType: req.body.itemType,
            unit: req.body.unit,
            gst: req.body.gst,
            itemCategory: req.body.itemCategory,
            stockType: req.body.stockType,
            perKgWeight: req.body.perKgWeight,
            perQtyWeight: req.body.perQtyWeight,
            minWeightReq: req.body.minWeightReq,
            modifiedOn: date,
            modifiedBy: req.body.modifiedBy,
            status: req.body.status
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

/** delete item details */
exports.items_delete = (req, res, next) => {
    const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S');
    Items.findByIdAndUpdate({ _id: req.body._id }, {
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


// /** save item details */
// async function items_save(req, res) {
//     var item;
//     const dt = dateTime.create();
//     const date = dt.format('Y-m-d H:M:S');
//     const items = new Items({
//         _id: new mongoose.Types.ObjectId(),
//         itemName: req.body.items.itemName,
//         itemType: req.body.items.itemType,
//         unit: req.body.items.unit,
//         gst: req.body.items.gst,
//         createdOn: date,
//         createdBy: req.body.items.createdBy,
//         status: req.body
//     });
//     var s = await items.save()
//         .then(doc => {
//             item = doc;
//         })
//         .catch(err => {
//             res.status(500).json({
//                 error: err
//             })
//         });
//     return item;
// }

// /** item details updation */
// async function items_update(req, res) {
//     const dt = dateTime.create();
//     const date = dt.format('Y-m-d H:M:S');
//     var item;
//     var s = await Items.findByIdAndUpdate({ _id: req.body.items._id }, {
//         $set: {
//             itemName: req.body.items.itemName,
//             itemType: req.body.items.itemType,
//             unit: req.body.items.unit,
//             gst: req.body.items.gst,
//             modifiedOn: date,
//             modifiedBy: req.body.modifiedBy
//         }
//     })
//         .exec()
//         .then(doc => {
//             item = doc;
//         })
//         .catch(err => {
//             res.status(500).json({
//                 error: err
//             })
//         })
//     return item;
// }

/** get only the raw material items */
exports.get_raw_material_items = (req, res) => {
    Items.find({ 'itemType': 'RawMaterial' })
        .where('status')
        .equals('Active')
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

/**
 Get Items By Item Type
 */
exports.get_items_by_item_type = (req, res) => {
    Items.find({ $and: [{ 'itemType': req.params.type }, { 'itemCategory': req.params.category }] })
        .where('status')
        .equals('Active')
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

exports.get_items_by_item_category = (req, res) => {
    Items.find({ 'itemCategory': req.params.category })
        .where('status')
        .equals('Active')
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

// module.exports.items_save = items_save;
// module.exports.items_update = items_update;
