const dateTime = require('node-datetime');
const mongoose = require('mongoose');


/*Model*/
const UnscheduledMelt = require('../../model/production/unscheduled-melt');

//getting all info from DB
exports.unschedule_melt_get_all = (req, res) => {
    UnscheduledMelt.find().limit(4)
        .sort({ 'deliveryDate': '1' })
        .where('status')
        .equals('A')
        .exec()
        .then((docs) => {
            res.status(200).json(docs);
        })
        .catch(err => {
            res.status(500).json({
                message: 'Error'
            });
        });
};
exports.unschedule_melt_get = (req, res) => {
    UnscheduledMelt.find()
        .exec()
        .then((docs) => {
            res.status(200).json(docs);
        })
        .catch(err => {
            res.status(500).json({
                message: 'Error'
            });
        });
};

exports.unschedule_melt_get_customer = (req, res) => {
    UnscheduledMelt.find()
        .where('customerName')
        .equals(req.params.customerName)
        .exec()
        .then((docs) => {
            res.status(200).json(docs);
        })
        .catch(err => {
            res.status(500).json({
                message: 'Error'
            });
        });
};

async function unscheduled_save(req,res,doc){

    const dt = dateTime.create();
    const formatted = dt.format('d-m-Y H:M:S');    
    console.log('order',doc)
    const unscheduledmelt=new UnscheduledMelt({
        _id:new mongoose.Types.ObjectId(),
        order: doc._id,
        orderId: doc.orderId,
        customerName: req.body.customer.customerName,
        partId: req.body.product.partId,
        meltWeight: Number(req.body.quantity)*Number(req.body.product.partWeight),
        moldType: req.body.product.moldType,
        coreWeight: req.body.product.coreWeight,
        quantity: req.body.quantity,
        paintingType: req.body.paintingType,
        partWeight: req.body.product.partWeight,
        totalWeight: req.body.product.totalWeight,
        deliveryDate: req.body.deliveryDate,
        orderDate: req.body.orderDate,
        createdBy: req.body.createdBy,
        createdOn: formatted,
        status:'A'
    });
    unscheduledmelt.save()
    .then((docs)=>{
       res.status(200).json(doc);
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
}

async function unscheduled_melt_get_quantity_by_orderid(orderId){
    var result = await UnscheduledMelt.findOne({'orderId':orderId})
    .exec()
    .then(docs =>{
        return docs;
    }) 
    return result;
}

async function unscheduled_melt_find_by_id(id) {
    var unscheduledMelt = await UnscheduledMelt.findById({ '_id': id })
        .exec();
    return unscheduledMelt;
}


async function unscheduled_melt_status_update(id){
    var unscheduledMelt = await UnscheduledMelt.findByIdAndUpdate({'_id':id},{
        $set:{
            status:"D"
        }
    },
{new: true})
    .exec();
    return unscheduledMelt;
}

module.exports.unscheduled_save = unscheduled_save;
module.exports.unscheduled_melt_status_update = unscheduled_melt_status_update;
module.exports.unscheduled_melt_find_by_id= unscheduled_melt_find_by_id;
module.exports.unscheduled_melt_get_quantity_by_orderid = unscheduled_melt_get_quantity_by_orderid;