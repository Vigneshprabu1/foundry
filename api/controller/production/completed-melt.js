/* 
Module Name: Production Monitoring
Sub Module Name:Completed Melt
*/

/* Module */
const mongoose = require('mongoose');
/* import Datetime */
const dateTime = require('node-datetime');
/* Model */
const CompletedMelt = require('../../model/production/completed-melt');
const OnGoingMelt = require('../../model/production/onGoing-Melt');
const OnGoingMeltController = require('../../controller/production/onGoing-Melt');
const Melt = require('../../model/production/melt');
const Yield = require('../../model/production/yield');
const ScheduledMelt = require('../../model/production/scheduleMelt');
const UnscheduledMelt = require('../../controller/production/unscheduled-melt');
const MeltReport = require('../../model/production/melt-report');


/* Getting Completed Melt Data with the limit of 4 */
exports.completed_melt_get_all = (req, res) => {
    CompletedMelt.find()
        .where('status')
        .equals('A')
        .limit(4)
        .exec()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            res.status(500).json({
                message: 'Error'
            });
        });
};


/*Completed Melt Save Process */
async function completed_melt_save(result, req, res) {
    var result2;
    /* Get current datetime */
    const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S');
    const completedMelt = new CompletedMelt({
        _id: new mongoose.Types.ObjectId(),
        orderId: result.orderId,
        orderDate: result.orderDate,
        batchId: result.batchId,
        customerName: result.customerName,
        partId: result.partId,
        moldType: result.moldType,
        partWeight: result.partWeight,
        quantity: result.quantity,
        deliveredQuantity:0,
        deliveryDate: result.deliveryDate,
        status: 'D',
        createdOn: date,
        createdBy: req.body.createdBy
    });
    var ss = await completedMelt.save()
        .then((result1) => {
            result2 = result1;
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
    return result2;
}


/* 
getting ongoing melt data and stored in completed melt 
If the scheduled quantity equal to ordered quantity, set the status as A 
If the scheduled quantity not equal to ordered quantity, set the status as D
*/
async function update_scheduled_melt_as_completed_melt(batchId) {
    //Get current datetime
    const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S');
    OnGoingMeltController.find_with_batch_id(batchId).then(docs1 => {
        UnscheduledMelt.unscheduled_melt_get_quantity_by_orderid(docs1.orderId).then(
            docs2 => {
                OnGoingMelt.aggregate([
                    { $match: { $and: [{ orderId: docs1.orderId }, { status: 'C' }] } },
                    {
                        $group:
                        {
                            _id: docs1.orderId,
                            quantity: { $sum: "$quantity" }
                        }
                    }
                ])
                    .exec()
                    .then(docs3 => {
                        docs3.forEach(element => {
                            var quantity = element.quantity;
                            if (quantity == docs2.quantity) {
                                MeltReport.aggregate([
                                    { $match: { $and: [{ orderId: docs1.orderId }, { status: 'C' }] } },
                                    {
                                        $group:
                                        {
                                            _id: docs1.orderId,
                                            returnWeight: { $sum: "$returnWeight" },
                                            rejectionWeight:{$sum : "$rejectionWeight"}
                                        }
                                    }
                                ])
                                    .exec()
                                    .then(docs4 => {
                                        docs4.forEach(element1 => {
                                            var returnWeight = element1.returnWeight;
                                            var rejectionWeight = element1.rejectionWeight;
                                            completed_melt_status_updation(docs2, returnWeight,rejectionWeight, docs1);
                                            return docs2;
                                              })
                                        })
                                    }
                                    else{
                                        completed_melt_update(quantity,docs2);
                                        return docs2;
                                    }
                            })
                        });
                    }
                    )
            })
            return batchId;
    }


 function completed_melt_update(quantity, docs2, res) {
    //Get current datetime
    const dt = dateTime.create();
    const date = dt.format('Y-m-d H:M:S');
   var completedMelt = CompletedMelt.findOneAndUpdate({ orderId: docs2.orderId }, {
        $set: {
            deliveredQuantity: quantity ,
            deliveryDate: docs2.deliveryDate,
            modifiedOn: date,
        }
    },
        { new: true })
        .exec();       
    return completedMelt;
}


async function completed_melt_find_by_orderId(orderId) {
    var result = await CompletedMelt.find({ 'orderId': orderId })
        .exec();
    return result;
}



function completed_melt_status_updation(docs2, returnWeight, rejectionWeight,docs1) {
    CompletedMelt.findOneAndUpdate({ orderId: docs2.orderId }, {
        $set: {
            rejectionWeight:rejectionWeight,
            returnWeight: returnWeight,
            deliveryDate: Date.now(),
            quantity: docs2.quantity,
            orderId: docs2.orderId,
            customerName: docs2.customerName,
            partId: docs2.partId,
            status: 'A'
        }
    }, { new: true })
        .exec();
}



module.exports.completed_melt_save = completed_melt_save;
module.exports.completed_melt_find_by_orderId = completed_melt_find_by_orderId;
module.exports.completed_melt_update = completed_melt_update;
module.exports.update_scheduled_melt_as_completed_melt = update_scheduled_melt_as_completed_melt;